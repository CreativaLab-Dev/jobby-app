"use server";

import {getCandidate} from "@/features/share/actions/get-candidate";
import {getOpportunitySelection} from "@/features/oportunities/actions/get-opportunity-selection";
import {prisma} from "@/lib/prisma";

export const addOpportunitySelection = async (selectedType: string) => {
  try {
    const opportunity = await getOpportunitySelection();
    if (!opportunity) {
      // If no opportunity exists, create a new one
      const candidate = await getCandidate();
      if (!candidate) {
        return { success: false, message: "Candidate not found." };
      }
      
      const newOpportunity = await prisma.opportunitySelection.create({
        data: {
          candidateId: candidate.id,
          type: selectedType,
        }
      });
      
      if (!newOpportunity) {
        return { success: false, message: "Failed to create opportunity selection." };
      }
    } else {
      // If an opportunity already exists, update it
      const updatedOpportunity = await prisma.opportunitySelection.update({
        where: { id: opportunity.id },
        data: { type: selectedType }
      });
      
      if (!updatedOpportunity) {
        return { success: false, message: "Failed to update opportunity selection." };
      }
    }
  } catch (error) {
    console.error("[ADD_OPPORTUNITY_SELECTION_ERROR]", error);
    return { success: false, message: "Failed to fetch opportunity selection." };
  }
}