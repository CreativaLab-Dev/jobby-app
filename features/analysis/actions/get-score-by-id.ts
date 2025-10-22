import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/share/actions/get-current-user";

export const getEvaluationById = async (analyzeId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;

    const cvEvaluation = await prisma.cvEvaluation.findFirst({
      where: { id: analyzeId },
      include: {
        scores: true,
        recommendations: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!cvEvaluation) return null;

    return cvEvaluation;
  } catch (error) {
    console.error("[ERROR_GET_SCORE_ANALYSIS]", error);
    return null;
  }
};
