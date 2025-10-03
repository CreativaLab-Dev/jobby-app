import {getCandidate} from "@/features/share/actions/get-candidate";
import {AcademicProject, Achievement, CV, CVRevision, Education, Skill} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export type SectionId = "education" | "skills" | "academicProjects" | "achievements" | "revisions";
export type CVType = CV & {
  education: Education[];
  academicProjects: AcademicProject[];
  achievements: Achievement[];
  skills: Skill[];
  revisions: CVRevision[];
}

export const getCv= async (): Promise<CVType | null>  => {
  try {
    const candidate = await getCandidate();
    if (!candidate) {
      return null
    }
    
    const cvs = await prisma.cV.findMany({
      where: {
        candidateId: candidate.id,
        createdWithBuilder: true,
      },
      include: {
        education: true,
        skills: true,
        academicProjects: true,
        achievements: true,
        revisions: true
        
      }
    })
    
    if (cvs.length === 0) {
      return null
    }
    
    // Return the first CV found
    return cvs[0]
  } catch (error) {
    console.error("[ERROR_GET_CV]", error);
    return null;
  }
}