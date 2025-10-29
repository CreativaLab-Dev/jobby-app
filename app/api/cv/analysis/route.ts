import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
import { CVData } from "@/types/cv";
import {getCurrentUser} from "@/features/share/actions/get-current-user";

interface CvBody {
  cvId: string;
  cvData: CVData;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cvId, cvData }: CvBody = body;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    await inngest.send({
      name: "cv.analyze",
      data: { cvId, cvData, userId: currentUser.id }
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
