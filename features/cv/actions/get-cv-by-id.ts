import {getCandidate} from "@/features/share/actions/get-candidate";
import {
  AcademicProject,
  Achievement,
  Certification,
  CV,
  CVRevision,
  Education,
  Experience,
  Skill
} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export type CVType = CV & {
  education: Education[];
  academicProjects: AcademicProject[];
  achievements: Achievement[];
  skills: Skill[];
  revisions: CVRevision[];
  experience: Experience[];
  certifications: Certification[];
}

export const getCvById= async (cvId: string): Promise<CVType | null>  => {
  try {
    const candidate = await getCandidate();
    if (!candidate) {
      return null
    }
    
    const cv = await prisma.cV.findFirst({
      where: {
        id: cvId
      },
      include: {
        education: true,
        skills: true,
        academicProjects: true,
        achievements: true,
        revisions: true,
        experience: true,
        certifications: true,
        
      }
    })
    
    if (!cv) {
      console.warn("[NOT_FOUND_GET_CV]", `No CV found with id: ${cvId}`);
      return null
    }
    
    // Return the first CV found
    return cv
  } catch (error) {
    console.error("[ERROR_GET_CV]", error);
    return null;
  }
}