import { inngest } from "../../client";
import { prisma } from "@/lib/prisma";
import { JobStatus } from "@prisma/client";
import { getTextFromPdf } from "@/lib/pdf/get-text-from-pdf";
import { getPromptToGetCv } from "@/lib/prompts/get-prompt-to-get-cv";
import { queryGemini } from "@/lib/queries/query-gemini";

export const processUploadedCv = inngest.createFunction(
  { id: "process-uploaded-cv" },
  { event: "cv/uploaded" },
  async ({ event, step }) => {
    const { cvId, attachmentUrl } = event.data;

    // 1️⃣ Create and mark job as IN_PROGRESS
    const job = await prisma.queueJob.create({
      data: {
        jobId: event.id,
        type: "CREATE_CV",
        payload: event.data,
        status: JobStatus.IN_PROGRESS,
        cvId,
        startedAt: new Date(),
      },
    });

    try {
      let textFromCv = "";
      let extractedData = null;

      const result = await step.run("Extract data from CV", async () => {
        textFromCv = await getTextFromPdf(new File([], attachmentUrl));
        const prompt = getPromptToGetCv(textFromCv);
        extractedData = await queryGemini({
          prompt,
          type: "JSON",
        });
        return extractedData;
      });

      if (!result.success || extractedData === null) {
        throw new Error(result.message ?? "Extraction failed");
      }

      const jsonData = result.data;
      const textCv = JSON.stringify(jsonData, null, 2);

      await prisma.cv.update({
        where: { id: cvId },
        data: {
          extractedJson: jsonData,
          fullTextSearch: textCv,
        }
      });

      await prisma.queueJob.update({
        where: { id: job.id },
        data: {
          status: JobStatus.SUCCEEDED,
          finishedAt: new Date(),
        },
      });

      await step.sendEvent("cv/ready-for-evaluation", {
        name: "CV Ready for Evaluation",
        data: { cvId },
      });

    } catch (err: any) {
      console.error("❌ CV processing failed:", err);
      await prisma.queueJob.update({
        where: { id: job.id },
        data: {
          status: JobStatus.FAILED,
          lastError: err.message,
        },
      });
      throw err;
    }
  }
);
