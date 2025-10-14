import { inngest } from "../client";
import { createAnalysisOfCv } from "@/lib/create-analysis-of-cv";
import { convertFromJsonToText } from "@/utils/convert-from-json-to-text";
import { updateUsageWithAnalyze } from "@/lib/update-usage-with-analyze";
import { CVData } from "@/types/cv";

type Payload = { cvId: string; cvData: CVData; candidateId: string };

export const analyzeCv = inngest.createFunction(
  {
    id: "analyze-cv",
    name: "Analyze CV",
    retries: 3,
  },
  { event: "cv.analyze" },
  async ({ event }) => {
    const payload = event.data as Payload;

    const text = convertFromJsonToText(payload.cvData);
    if (!text) throw new Error("Failed to extract text from CV JSON.");

    const analyseId = await createAnalysisOfCv(payload.cvId, text);
    if (!analyseId) throw new Error("Failed to create CV analysis.");

    await updateUsageWithAnalyze(payload.candidateId);

    console.log("✅ Finished CV analysis:", analyseId);
    return { analyseId };
  }
);
