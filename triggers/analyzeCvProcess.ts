import { task } from "@trigger.dev/sdk/v3";
import { createAnalysisOfCv } from "@/lib/create-analysis-of-cv";
import { convertFromJsonToText } from "@/utils/convert-from-json-to-text";
import { updateUsageWithAnalyze } from "@/lib/update-usage-with-analyze";

export const analyzeCv = task({
  id: "analyze-cv",
  run: async (payload: { cvId: string; cvData: any; candidateId: string }) => {
    console.log("🚀 Starting analysis for CV:", payload.cvId);

    // 1️⃣ Convert JSON to plain text
    const text = convertFromJsonToText(payload.cvData);
    if (!text) throw new Error("Failed to extract text from CV JSON.");

    // 2️⃣ Send text to Gemini or AI analysis service
    const analyseId = await createAnalysisOfCv(payload.cvId, text);
    if (!analyseId) throw new Error("Failed to create CV analysis.");

    // 3️⃣ Update user usage (optional)
    await updateUsageWithAnalyze(payload.candidateId);

    console.log("✅ Finished CV analysis:", analyseId);
    return { analyseId };
  },
});
