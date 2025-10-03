"use server"

import {getCandidate} from "@/features/share/actions/get-candidate";
import {prisma} from "@/lib/prisma";

export const addLanguageCv = async (language: string) => {
  try {
    const candidate = await getCandidate();
    if (!candidate) {
      return { success: false, message: "Candidate not found." };
    }
    
    const cvs = await prisma.cV.findMany({
      where: { candidateId: candidate.id },
    })
    
    //Create a new CV if none exists or if the existing CV was not created with the builder
    const builderCV = cvs.find(cv => cv.createdWithBuilder);
    if (cvs.length === 0 || !builderCV) {
      //Create a new CV if none exists
      const newCV = await prisma.cV.create({
        data: {
          candidateId: candidate.id,
          language: language,
          createdWithBuilder: true,
        }
      });
      
      if(!newCV) {
        return { success: false, message: "Failed to create CV." };
      }
      
      return { success: true, message: "Language added successfully.", cv: newCV };
    }
    
    //Update existing CV
    const updatedCV = await prisma.cV.update({
      where: { id: builderCV.id },
      data: {
        language: language
      }
    });
    
    if (!updatedCV) {
      return { success: false, message: "Failed to update CV." };
    }
    
    return { success: true, message: "Language updated successfully.", cv: updatedCV}
  } catch (error) {
    console.error("[ADD_LANGUAGE_ACTION_ERROR]", error);
    return { success: false, message: "Failed to fetch candidate." };
  }
}