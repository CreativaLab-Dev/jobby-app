"use server"

import {prisma} from "@/lib/prisma";

export const createCandidate = async (userId: string) => {
  try{
    const candidate = await prisma.candidate.create({
      data: {
        userId,
        usage: {
          create: {
            analyzeCV: 0,
            createCVWithAI: 0,
          }
        }
      },
    })
    if (!candidate) {
      return {
        success: false,
        error: "No se pudo crear el candidato. Inténtalo de nuevo más tarde."
      };
    }
    return {
      success: true,
      candidateId: candidate.id
    };
  } catch (error) {
    console.log("[ERROR_CREATE_CANDIDATE]", error.message || error);
    return {
      success: false,
      error: "Error al crear el candidato. Inténtalo de nuevo más tarde."
    };
  }
}