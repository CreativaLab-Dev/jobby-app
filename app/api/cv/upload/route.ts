import { NextResponse } from "next/server";
import {savePdf} from "@/features/upload-cv/actions/save-pdf";
import {getTextFromPdfApi} from "@/utils/get-text-from-pdf-api";
import {createAnalysisOfCv} from "@/lib/create-analysis-of-cv";
import {updateUsageWithAnalyze} from "@/lib/update-usage-with-analyze";
import {getCandidate} from "@/features/share/actions/get-candidate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;
    
    const candidate = await getCandidate()
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
    
    const pdfUrl = pdfSaved.data.url;
    
    const textPdf = await getTextFromPdfApi(pdfUrl);
    if (!textPdf) {
      return NextResponse.json(
        { success: false, message: "Failed to extract text from PDF." },
        { status: 500 }
      );
    }
    
    const cvId = pdfSaved.data.cvId;
    const analyzeId = await createAnalysisOfCv(cvId, textPdf)
    if (!analyzeId) {
      return NextResponse.json(
        { success: false, message: "Failed to start background analyzed." },
        { status: 500 }
      );
    }
    
    await updateUsageWithAnalyze(candidate.id)
    
    
    return NextResponse.json({ success: true, message: "PDF analyzed started.", data: analyzeId });
  } catch (error) {
    console.error("Error processing PDF upload:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process PDF upload." },
      { status: 500 }
    );
  }
}