import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { getCandidate } from "@/features/share/actions/get-candidate";
import { CVData } from "@/types/cv";

interface CvBody {
  cvId: string;
  cvData: CVData;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cvId, cvData }: CvBody = body;

    const candidate = await getCandidate();
    if (!candidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found." },
        { status: 404 }
      );
    }

    await inngest.send({
      name: "cv.analyze",
      data: { cvId, cvData, candidateId: candidate.id }
    });

    return NextResponse.json(
      {
        success: true,
        message: "CV analysis started in background.",
        data: { cvId },
      },
      { status: 202 }
    );
  } catch (error) {
    console.error("❌ Error starting CV analysis:", error);
    return NextResponse.json(
      { success: false, message: "Failed to start CV analysis." },
      { status: 500 }
    );
  }
}
