import { inngest } from "../../client";
import { prisma } from "@/lib/prisma";
import { JobStatus } from "@prisma/client";
import { getPromptToGetCv } from "@/lib/prompts/get-prompt-to-get-cv";
import { queryGemini } from "@/lib/queries/query-gemini";
import { getTextFromPdfApi } from "@/utils/get-text-from-pdf-api";

export const processUploadedCv = inngest.createFunction(
  { id: "process-uploaded-cv" },
  { event: "cv/uploaded" },
  async ({ event, step }) => {
    const { cvId, attachmentUrl } = event.data;

    // 1️⃣ Create and mark job as IN_PROGRESS
    const job = await prisma.queueJob.upsert({
      where: { jobId: event.id },
      update: {
        status: JobStatus.IN_PROGRESS,
        startedAt: new Date(),
      },
      create: {
        jobId: event.id,
        type: "CREATE_CV",
        payload: event.data,
        status: JobStatus.IN_PROGRESS,
        cvId,
        startedAt: new Date(),
      },
    });

    try {
      const result = await step.run("Extract data from CV", async () => {
        const textFromCv = await getTextFromPdfApi(attachmentUrl);
        const prompt = getPromptToGetCv(textFromCv);
        return await queryGemini({ prompt, type: "JSON" });
      });
      console.log("✅ Extraction result:", result);

      if (!result.success) {
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

      console.log("[✅ CV sections]:", jsonData.sections);

      if (Array.isArray(jsonData.sections)) {
        await prisma.cvSection.deleteMany({ where: { cvId } });

        const sectionsData = jsonData.sections.map((section: any, index: number) => ({
          cvId,
          sectionType: section.sectionType,
          title: section.title ?? null,
          contentJson: section.contentJson ?? [],
          order: index,
        }));

        await prisma.cvSection.createMany({ data: sectionsData });
      }

      console.log("[✅ CV sections COMPLETED]:");

      await prisma.queueJob.update({
        where: { id: job.id },
        data: {
          status: JobStatus.SUCCEEDED,
          finishedAt: new Date(),
        },
      });

      await inngest.send({
        name: "cv/ready-for-evaluation",
        data: {
          cvId,
        },
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
