"use server";
//Todo: refactor

import { getCandidate } from "@/features/share/actions/get-candidate";
// import {updateUsageWithBuild} from "@/lib/update-usage-with-builder";
import { prisma } from "@/lib/prisma";

export const createCVByTitleAndType = async (
  title: string,
  type: string,
  opportunityType: string
) => {
  try {
    const candidate = await getCandidate();
    if (!candidate) {
      return { success: false, message: "Candidate not found." };
    }

    // const newCv = await prisma.cv.create({
    //   data: {
    //     title,
    //     type,
    //     candidateId: candidate.id,
    //     status: "CREATED",
    //   }
    // })
    // if (!newCv) {
    //   return { success: false, message: "No se pudo crear el CV." };
    // }

    // await updateUsageWithBuild(candidate.id);

    return {
      success: true, message: "CV creado exitosamente.", data: {
        // cv: newCv
      }
    };

  } catch (error) {
    console.error("[ERROR_CREATE_CV_BY_TITLE_AND_TYPE]", error);
    return { success: false, message: "Error al crear el CV." };
  }
}