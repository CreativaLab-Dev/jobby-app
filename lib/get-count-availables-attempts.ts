import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const getCurrentSubscription = async () => {
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
    if (!lastUserSubscription) {
      return;
    }
    return lastUserSubscription;

  } catch (error) {
    console.error("[ERROR_GET_AVAILABLE_ATTEMPTS]", error);
    return;
  }
}