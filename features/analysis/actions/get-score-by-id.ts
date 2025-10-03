import { prisma } from "@/lib/prisma";
import { getCandidate } from "@/features/share/actions/get-candidate";

export const getScoreById = async (analyzeId: string) => {
  try {
    const candidate = await getCandidate();
    if (!candidate) return null;
    
    const cvAnalysis = await prisma.cVAnalysis.findFirst({
      where: { id: analyzeId },
      include: {
        sectionScores: {
          include: {
            fieldScores: true,
          },
        },
        recommendations: true,
        cv: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!cvAnalysis) return null;
    
    return cvAnalysis;
  } catch (error) {
    console.error("[ERROR_GET_SCORE_ANALYSIS]", error);
    return null;
  }
};
