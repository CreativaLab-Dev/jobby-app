import { inngest } from "../client";
import { getTextFromPdfApi } from "@/utils/get-text-from-pdf-api";
import { createAnalysisOfCv } from "@/lib/create-analysis-of-cv";
import { updateUsageWithAnalyze } from "@/lib/update-usage-with-analyze";

type Payload = { pdfUrl: string; cvId: string; candidateId: string };

export const processCv = inngest.createFunction(
  {
    id: "process-cv",
    name: "Process CV (PDF -> analysis)",
    retries: 3,
  },
  { event: "cv.process" },
  async ({ event }) => {
    const payload = event.data as Payload;
    console.log("🚀 Starting CV processing for:", payload.cvId);

    // 1️⃣ Get text from PDF
    const textPdf = await getTextFromPdfApi(payload.pdfUrl);
    if (!textPdf) throw new Error("Failed to extract text from PDF.");

    // 2️⃣ Create AI analysis
    const analyzeId = await createAnalysisOfCv(payload.cvId, textPdf);
    if (!analyzeId) throw new Error("Failed to start CV analysis.");

    // 3️⃣ Update usage
    await updateUsageWithAnalyze(payload.candidateId);

    console.log("✅ Finished CV processing:", analyzeId);
    return { analyzeId };
  }
);
