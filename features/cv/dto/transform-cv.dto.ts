import { CVData } from "@/types/cv";
import {SkillCategory} from "@prisma/client";
import {CVType} from "@/features/cv/actions/get-cv-by-id";

export function transformCVToDTO(cv: CVType): CVData {
  return {
    personal: {
      fullName: cv.fullName || "",
      address: cv.address || "",
      linkedin: cv.linkedin || "",
      summary: cv.professionalSummary || "",
      phone: cv.phone || "",
      email: cv.email || "",
    },
    education: {
      items: cv.education.map((educ) => ({
        id: educ.id,
        institution: educ.institution || "",
        location: educ.location || "",
        title: educ.title || "",
        level: educ.level || "",
        year: educ.year || (educ.graduationYear ? String(educ.graduationYear) : ""),
        honors: educ.honors || "",
      })),
    },
    skills: {
      soft: cv.skills
        .filter((skill) => skill.category === SkillCategory.BLANDA)
        .map((skill) => skill.name),
      technical: cv.skills
        .filter((skill) => skill.category === SkillCategory.TECNICA)
        .map((skill) => skill.name),
      languages: cv.skills
        .filter((skill) => skill.category === SkillCategory.IDIOMA)
        .map((skill) => skill.name),
    },
    projects: {
      items: cv.academicProjects.map((project) => ({
        id: project.id,
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies || "",
        duration: project.duration || "",
      })),
    },
    achievements: {
      items: cv.achievements.map((achievement) => ({
        id: achievement.id,
        title: achievement.title || "",
        description: achievement.description || "",
        date: achievement.date.toISOString().split("T")[0],
      })),
    },
    experience: {
      items: cv.experience?.map((exp) => ({
        id: exp.id,
        position: exp.position || "",
        company: exp.company || "",
        location: exp.location || "",
        duration: exp.duration || "",
        responsibilities: exp.responsibilities || "",
      })) || [],
    },
    certifications: {
      items: cv.certifications?.map((cert) => ({
        id: cert.id,
        name: cert.name || "",
        issuer: cert.issuer || "",
        date: cert.issueDate ? cert.issueDate.toISOString().split("T")[0] : "",
      })) || [],
    },
  };
}
