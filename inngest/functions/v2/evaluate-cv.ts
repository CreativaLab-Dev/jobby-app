import { inngest } from "../../client";
import { prisma } from "@/lib/prisma";
import { queryGemini } from "@/lib/queries/query-gemini";
import { getPromptToEvaluateCv } from "@/lib/prompts/get-prompt-to-evaluate-cv";
import { CvSectionType, JobStatus } from "@prisma/client";

type EvaluateCvResponse = {
  overallScore: number;
  summary: string;
  sectionScores: Array<{
    sectionType: CvSectionType;
    score: number;
    details: Record<string, number>;
  }>;
  recommendations: Array<{
    sectionType: CvSectionType;
    text: string;
    severity: "LOW" | "MEDIUM" | "HIGH";
  }>;
};

export const evaluateCv = inngest.createFunction(
  { id: "evaluate-cv" },
  { event: "cv/ready-for-evaluation" },
  async ({ event }) => {
    const { cvId } = event.data;
    const cv = await prisma.cv.findUnique({ where: { id: cvId } });

    if (!cv?.extractedJson) throw new Error("CV data not extracted");

    const evaluation = await prisma.cvEvaluation.create({
      data: { cvId, status: "IN_PROGRESS" },
    });

    try {
      const promptToEvaluateCv = getPromptToEvaluateCv(cv.extractedJson);
      const result = await queryGemini<EvaluateCvResponse>({
        prompt: promptToEvaluateCv,
        type: "JSON",
      });
      if (!result.success) {
        throw new Error(result?.message ?? "Evaluation failed");
      }
      await prisma.$transaction(async (tx) => {
        await tx.cvEvaluation.update({
          where: { id: evaluation.id },
          data: {
            status: JobStatus.SUCCEEDED,
            overallScore: result.data.overallScore,
            summary: result.data.summary,
          },
        });

        for (const score of result.data.sectionScores) {
          await tx.evaluationScore.create({
            data: {
              evaluationId: evaluation.id,
              sectionType: score.sectionType,
              score: score.score,
              detailsJson: score.details,
            },
          });
        }

        for (const rec of result.data.recommendations) {
          await tx.recommendation.create({
            data: {
              evaluationId: evaluation.id,
              sectionType: rec.sectionType,
              text: rec.text,
              severity: rec.severity,
            },
          });
        }
      });
    } catch (error) {
      await prisma.cvEvaluation.update({
        where: { id: evaluation.id },
        data: {
          status: JobStatus.FAILED,
        },
      });
      throw error;
    }
  }
);
