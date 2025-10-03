"use server";

import { generatePrompt } from "@/lib/prompt-generate";

type SectionScore<T extends string> = {
  score: number;
  details: Record<T, number>;
};

export type CVReviewResponse = {
  overallScore: number;
  sections: {
    personalInformation: SectionScore<
      "fullName" | "professionalEmail" | "phoneNumber" | "professionalSummary"
    >;
    education: SectionScore<
      "recognizedInstitution" | "relevantDegree" | "academicGPA" | "graduationYear"
    >;
    projectsExperience: SectionScore<
      "numberOfProjectsJobs" | "detailedDescriptions" | "relevantTechnologies" | "quantifiableResults"
    >;
    skills: SectionScore<
      "technicalSkills" | "softSkills" | "languages" | "relevanceToCareerGoals"
    >;
    formatAndPresentation: SectionScore<
      "clearStructure" | "grammarAndSpelling" | "appropriateLength" | "professionalDesign"
    >;
  };
  recommendations: Array<{
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }>;
};

export type ResumeMetadata = {
  title: string;
  type: string;
  opportunityType: string;
  language: string;
  fullName: string;
  email: string;
  phone: string;
  professionalSummary: string;
  status: string;
  education: Array<{
    title: string;
    level: "PRIMARIA" | "SECUNDARIA" | "BACHILLER" | "TECNICO" | "MAESTRIA" | "DOCTORADO" | "OTRO";
    institution: string;
    graduationYear: number;
    degree: string;
    status: "COMPLETED" | "IN_PROGRESS" | "NOT_COMPLETED";
  }>;
  academicProjects: Array<{
    title: string;
    description: string;
    technologies: string;
    duration: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date: string; // ISO string
  }>;
  skills: Array<{
    category: "BLANDA" | "TECNICA" | "IDIOMA";
    name: string;
    proficiency: "1" | "2" | "3" | "4" | "5";
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string; // e.g., "6 months", "1 year"
    startDate: string; // ISO string
    endDate: string; // ISO string
    description: string;
    responsibilities?: string;
  }>;
  certification: Array<{
    name: string;
    issuer: string;
    issueDate: string; // ISO string
    expirationDate?: string; // ISO string, optional
    credentialId?: string; // optional
    credentialUrl?: string; // optional
  }>
};

type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }> | null;
};

export type GeminiCVAnalysisResponse = {
  score?: CVReviewResponse;
  data?: ResumeMetadata;
};

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const getGeminiScore = async (
  prompt: string
): Promise<
  | { success: true; response: GeminiCVAnalysisResponse }
  | { success: false; message: string }
> => {
  if (!GEMINI_API_KEY) {
    return { success: false, message: "GEMINI_API_KEY is not set." };
  }
  
  try {
    const fullPrompt = generatePrompt(prompt);
    
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
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 4048,
          temperature: 0.7,
        },
      }),
    });
    
    if (!response.ok) {
      return {
        success: false,
        message: `Failed to fetch response from Gemini: ${response.status}`,
      };
    }
    
    const data = (await response.json()) as GeminiResponse;
    
    const responseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
    
    if (!responseText) {
      return { success: false, message: "No text found in the response." };
    }
    
    const match = responseText.match(/{[\s\S]*}/);
    if (!match) {
      return {
        success: false,
        message: "No valid JSON found in the response.",
      };
    }
    
    const jsonResponse = JSON.parse(match[0]) as GeminiCVAnalysisResponse;
    
    return {
      success: true,
      response: jsonResponse,
    };
  } catch (error: unknown) {
    console.error("Failed to get Gemini response:", error);
    return {
      success: false,
      message: "An error occurred while fetching the response.",
    };
  }
};
