import {prisma} from "@/lib/prisma";
import {getCandidate} from "@/features/share/actions/get-candidate";

export const getCvForCurrentUser = async () => {
  try {
    const candidate = await getCandidate();
    if (!candidate) {
      return;
    }
    
    return await prisma.cV.findMany({
      where: {
        candidateId: candidate.id,
      },
      include: {
        analyses: {
          include: {
            recommendations: true,
            sectionScores: true,
          }
        }
      },
    })
    
  } catch (error) {
    console.error("[GET_CV_FOR_CURRENT_USER_ERROR]", error);
    return;
  }
}