import { getSession } from "@/lib/shared/session";
import { prisma } from "@/lib/prisma";
import { SubscriptionPlan, UserSubscription } from "@prisma/client";

export type UserSubscriptionWithPlan = UserSubscription & {
  plan: SubscriptionPlan
}

export const getCurrentSubscription = async (): Promise<UserSubscriptionWithPlan | undefined> => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return;
    }

    const userId = session.user.id;
    const lastUserSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        plan: true,
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