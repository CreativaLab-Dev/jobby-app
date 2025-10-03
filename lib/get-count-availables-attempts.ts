import {getSession} from "@/lib/session";
import {prisma} from "@/lib/prisma";

export const getCountAvailableAttempts = async ()  => {
  const TOTAL_MAX = 2;
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return ;
    }
    
    const userId = session.user.id;
    const user = await prisma.candidate.findUnique({
      where: {
        userId,
      },
      include: {
        usage: true
      }
    })
    if (!user) {
      console.error("User not found by userId:", userId);
      return;
    }
    return {
      cvCreations: {
        used: user.usage.createCVWithAI,
        total: TOTAL_MAX,
      },
      scoreAnalysis: {
        used: user.usage.analyzeCV,
        total: TOTAL_MAX,
      }
    }
  } catch (error) {
    console.error("[ERROR_GET_AVAILABLE_ATTEMPTS]", error);
    return ;
  }
}