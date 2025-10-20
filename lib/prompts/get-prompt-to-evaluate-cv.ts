import { JsonValue } from "@prisma/client/runtime/library";

export const getPromptToEvaluateCv = (text: JsonValue) => {
  return `
You are an expert career evaluator and recruiter.

Analyze the following CV data and produce a structured JSON evaluation.
The goal is to rate the quality of this CV based on clarity, content, and relevance.

Input (CV data):
${JSON.stringify(text, null, 2)}

Output JSON format:
{
  "overallScore": number, // 0-100
  "summary": string, // short overall feedback
  "sectionScores": [
    {
      "sectionType": string, // e.g. "Education", "Experience", "Skills"
      "score": number, // 0-100
      "details": { "criterion": number, "criterion2": number } // internal breakdown
    }
  ],
  "recommendations": [
    {
      "sectionType": string,
      "text": string, // improvement advice
      "severity": "LOW" | "MEDIUM" | "HIGH"
    }
  ]
}

Rules:
- Return ONLY valid JSON.
- Do not include explanations, markdown, or commentary.
`;
};