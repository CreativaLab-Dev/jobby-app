"use server"

import {generatePrompt} from "@/lib/prompt-generate";

type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }> | null;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export type CVReviewResponse = {
  overallScore: number;
  sections: {
    personalInformation: SectionScore<"fullName" | "professionalEmail" | "phoneNumber" | "professionalSummary">;
    education: SectionScore<"recognizedInstitution" | "relevantDegree" | "academicGPA" | "graduationYear">;
    projectsExperience: SectionScore<"numberOfProjectsJobs" | "detailedDescriptions" | "relevantTechnologies" | "quantifiableResults">;
    skills: SectionScore<"technicalSkills" | "softSkills" | "languages" | "relevanceToCareerGoals">;
    formatAndPresentation: SectionScore<"clearStructure" | "grammarAndSpelling" | "appropriateLength" | "professionalDesign">;
  };
  recommendations: Array<{
    title: string;
    description: string;
    priority: string;
  }>
};

type SectionScore<T extends string> = {
  score: number;
  details: Record<T, number>;
};

export const getGeminiExtractText = async (prompt: string) => {
  
  if (!GEMINI_API_KEY) {
    return { success: false, message: "GEMINI_API_KEY is not set." };
  }
  
  try {
    const textFull = generatePrompt(prompt);
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: textFull
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        }
      }),
    });
    
    if (!response.ok) {
      return { success: false, message: "Failed to fetch response from Gemini"}
    }
    
    const data = await response.json() as GeminiResponse;
    const candidates = data.candidates;
    if (!candidates || candidates.length === 0) {
      return { success: false, message: "No candidates found in the response." };
    }
    if (!candidates[0].content || !candidates[0].content.parts || candidates[0].content.parts.length === 0) {
      return { success: false, message: "No text content found in the response." };
    }
    if (!candidates[0].content.parts[0].text) {
      return { success: false, message: "No text found in the first part of the response." };
    }
    
    // Return the text content of the first candidate
    const responseText = candidates[0].content.parts[0].text;
    const match = responseText.match(/{[\s\S]*}/);
    if (!match) {
      return { success: false, message: "No valid JSON found in the response." };
    }
    const jsonResponse = JSON.parse(match[0]) as CVReviewResponse;
    return { success: true, response: jsonResponse };
  } catch (error) {
    console.error("Failed to get Gemini response:", error);
    return { success: false, message: "An error occurred while fetching the response." };
  }
}