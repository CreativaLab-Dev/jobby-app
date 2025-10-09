import { NextResponse } from "next/server";
import { getCandidate } from "@/features/share/actions/get-candidate";
import { analyzeCv } from "@/triggers/analyzeCvProcess";
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

    // 🚀 Trigger background job instead of processing inline
    await analyzeCv.trigger({
      cvId,
      cvData,
      candidateId: candidate.id,
    });

    // Respond immediately — analysis will run asynchronously
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
