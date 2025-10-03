"use server";

import { prisma } from "@/lib/prisma";

export const updateUsageWithBuild = async (candidateId: string) => {
  try {
    await prisma.cVUsage.update({
      where: {
        candidateId,
      },
      data: {
        createCVWithAI: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.log("[ERROR_UPDATE_USAGE_WITH_ANALYZE]", error.message || error);
  }
}