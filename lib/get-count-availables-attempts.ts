import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const getCountAvailableAttempts = async () => {
  const TOTAL_MAX = 2;
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return;
    }

    const userId = session.user.id;
    const lastUserSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  } catch (error) {
    console.error("[ERROR_GET_AVAILABLE_ATTEMPTS]", error);
    return;
  }
}