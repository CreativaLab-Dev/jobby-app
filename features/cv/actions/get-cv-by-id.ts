import { getCandidate } from "@/features/share/actions/get-candidate";
import { getCurrentUser } from "@/features/share/actions/get-current-user";
import { prisma } from "@/lib/prisma";
import { Cv, CvSection } from "@prisma/client";

export type CvWithSections = Cv & {
  sections: CvSection[]
}

export const getCvById = async (cvId: string): Promise<CvWithSections | null> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      console.error("[ERROR_GET_CV] No current user");
      return null;
    }

    const cv = await prisma.cv.findFirst({
      where: {
        id: cvId
      },
      include: {
        sections: {
          orderBy: {
            order: 'asc',
          }
        }
      }

    })

    if (!cv) {
      console.error("[ERROR_GET_CV] CV not found");
      return null
    }

    return cv
  } catch (error) {
    console.error("[ERROR_GET_CV]", error);
    return null;
  }
}