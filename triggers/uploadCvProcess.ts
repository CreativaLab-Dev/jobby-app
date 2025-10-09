import { task } from "@trigger.dev/sdk/v3";
import { getTextFromPdfApi } from "@/utils/get-text-from-pdf-api";
import { createAnalysisOfCv } from "@/lib/create-analysis-of-cv";
import { updateUsageWithAnalyze } from "@/lib/update-usage-with-analyze";

export const processCv = task({
  id: "process-cv",
  run: async (payload: { pdfUrl: string; cvId: string; candidateId: string }) => {
    console.log("🚀 Starting CV processing for:", payload.cvId);

    // 1️⃣ Get text from PDF
    const textPdf = await getTextFromPdfApi(payload.pdfUrl);
    if (!textPdf) throw new Error("Failed to extract text from PDF.");

    // 2️⃣ Create Gemini analysis
    const analyzeId = await createAnalysisOfCv(payload.cvId, textPdf);
    if (!analyzeId) throw new Error("Failed to start CV analysis.");

    // 3️⃣ Update usage
    await updateUsageWithAnalyze(payload.candidateId);

    console.log("✅ Finished CV processing:", analyzeId);
    return { analyzeId };
  },
});
