import { getCandidate } from "@/features/share/actions/get-candidate";
import { getCurrentUser } from "@/features/share/actions/get-current-user";
import { prisma } from "@/lib/prisma";
import { Cv, CvSection, CvEvaluation, CvPreview, Attachment } from "@prisma/client";

export type CVWithSections = Cv & {
  sections: CvSection[];
};

export const getCvById = async (cvId: string): Promise<CVWithSections | null> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;

    const cv = await prisma.cv.findFirst({
      where: { id: cvId, userId: currentUser.id },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!cv) {
      console.warn("[NOT_FOUND_GET_CV]", `No CV found with id: ${cvId}`);
      return null;
    }

    return cv;
  } catch (error) {
    console.error("[ERROR_GET_CV]", error);
    return null;
  }
};
