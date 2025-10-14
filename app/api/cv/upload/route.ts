import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { savePdf } from "@/features/upload-cv/actions/save-pdf";
import { getCandidate } from "@/features/share/actions/get-candidate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;

    const candidate = await getCandidate();
    if (!candidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found." },
        { status: 404 }
      );
    }

    if (!pdfFile || !pdfFile.name.endsWith(".pdf")) {
      return NextResponse.json(
        { success: false, message: "Invalid file. Only PDF files are allowed." },
        { status: 400 }
      );
    }

    const pdfSaved = await savePdf(pdfFile);
    if (pdfSaved.error) {
      return NextResponse.json(
        { success: false, message: pdfSaved.error },
        { status: 400 }
      );
    }

    if (!pdfSaved.data) {
      return NextResponse.json(
        { success: false, message: "Failed to save PDF." },
        { status: 500 }
      );
    }

    const { url: pdfUrl, cvId } = pdfSaved.data;

    await inngest.send({
      name: "cv.process",
      data: { pdfUrl, cvId, candidateId: candidate.id }
    });

    return NextResponse.json({
      success: true,
      message: "CV analysis started in background.",
      data: { cvId },
    });
  } catch (error) {
    console.error("❌ Error processing PDF upload:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process PDF upload." },
      { status: 500 }
    );
  }
}
