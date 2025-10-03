"use server";

import { prisma } from "@/lib/prisma";

export const updateUsageWithAnalyze = async (candidateId: string) => {
  try {
    await prisma.cVUsage.update({
      where: {
        candidateId,
      },
      data: {
        analyzeCV: {
          increment: 1
        }
      }
    })
  } catch (error) {
    console.log("[ERROR_UPDATE_USAGE_WITH_ANALYZE]", error.message || error);
  }
}