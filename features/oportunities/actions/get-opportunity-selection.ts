import {getCandidate} from "@/features/share/actions/get-candidate";
import {prisma} from "@/lib/prisma";

export const getOpportunitySelection = async () => {
  try {
    const candidate = await getCandidate()
    if (!candidate) {
      return null;
    }
    
    const opportunity = await prisma.opportunitySelection.findFirst({
      where: {
        candidateId: candidate.id
      }
    })
    
    if (!opportunity) {
      return null;
    }
    
    return opportunity;
  } catch (error) {
    console.error("[ERROR_GET_OPPORTUNITY_SELECTION]", error);
    return null;
  }
}