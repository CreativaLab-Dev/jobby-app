import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/shared/session";

export const getCandidate = async () => {
  try {
    const session = await getSession();
    if (!session.success) {
      return null
    }

    const email = session.user?.email;
    const id = session.user?.id;

    if (!email || !id) {
      return null
    }

    const existingUser = await prisma.candidate.findFirst({
      where: {
        user: {
          email: email,
          id: id,
        }
      },
      include: {
        user: true
      }
    });
    if (!existingUser) {
      return null;
    }

    return {
      id: existingUser.id,
      user: {
        id: existingUser.user.id,
        email: existingUser.user.email,
        name: existingUser.user.name,
      }
    }
  } catch (error) {
    console.error("[GET_CANDIDATE_ERROR]", error);
    return null;
  }
}