"use server";

import { getCurrentUser } from "@/features/share/actions/get-current-user";
import { prisma } from "@/lib/prisma";
import { CvType, Language, OpportunityType } from "@prisma/client";

export const createCVByTitleAndType = async (
  title: string,
  cvType: CvType,
  opportunityType: OpportunityType
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "User not found." };
    }

    const newCv = await prisma.cv.create({
      data: {
        title,
        cvType,
        opportunityType,
        language: Language.EN,
        userId: currentUser.id,
      }
    });
    if (!newCv) {
      return { success: false, message: "Error creating CV." };
    }

    return {
      success: true,
      data: newCv
    };

  } catch (error) {
    console.error("[ERROR_CREATE_CV_BY_TITLE_AND_TYPE]", error);
    return { success: false, message: "Error al crear el CV." };
  }
}
