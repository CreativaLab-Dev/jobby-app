import { NextResponse } from "next/server";
import {createAnalysisOfCv} from "@/lib/create-analysis-of-cv";
import {CVData} from "@/types/cv";
import {convertFromJsonToText} from "@/utils/convert-from-json-to-text";
import {getCandidate} from "@/features/share/actions/get-candidate";

interface CvBody {
  cvId: string;
  cvData: CVData;
}

export async function POST(request: Request) {
  try {
    const response = await request.json();
    const { cvId, cvData }: CvBody = response;
    
    const candidate = await getCandidate()
    if (!candidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found." },
        { status: 404 }
      );
    }
    
    const text = convertFromJsonToText(cvData);
    if (!text) {
      return NextResponse.json(
        { success: false, message: "No text extracted from CV data." },
        { status: 400 }
      );
    }
    const analyseId = await createAnalysisOfCv(cvId, text)
    if (!analyseId) {
      return NextResponse.json(
        { success: false, message: "Failed to create CV analysis." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: "CV analysis started successfully.", data: analyseId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing PDF upload:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process PDF upload." },
      { status: 500 }
    );
  }
}