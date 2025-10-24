"use server";

import { CVData, CVSection } from "@/types/cv";
import { getCurrentUser } from "@/features/share/actions/get-current-user";
import { prisma } from "@/lib/prisma";
import { CvSectionType } from "@prisma/client";

const sectionTypeMap: Record<string, { type: CvSectionType; title: string; order: number }> = {
  "personal": { type: CvSectionType.CONTACT, title: "Información Personal", order: 0 },
  "education": { type: CvSectionType.EDUCATION, title: "Educación", order: 1 },
  "experience": { type: CvSectionType.EXPERIENCE, title: "Experiencia Profesional", order: 2 },
  "projects": { type: CvSectionType.PROJECTS, title: "Proyectos Académicos", order: 3 },
  "skills": { type: CvSectionType.SKILLS, title: "Habilidades", order: 4 },
  "achievements": { type: CvSectionType.CERTIFICATIONS, title: "Logros y Reconocimientos", order: 5 },
  "certifications": { type: CvSectionType.CERTIFICATIONS, title: "Certificaciones", order: 6 },
};

export const saveCV = async (id: string, cvSection: CVSection, cvData: CVData) => {
  try {
    const candidate = await getCurrentUser();
    
    if (!candidate) {
      return { success: false, message: "Candidate not found." };
    }

    const extractedJson = {
      personal: cvData.personal,
      education: cvData.education,
      experience: cvData.experience,
      projects: cvData.projects,
      skills: cvData.skills,
      achievements: cvData.achievements,
      certifications: cvData.certifications,
    };

    const cv = await prisma.cv.upsert({
      where: { id },
      update: {
        extractedJson,
        title: cvSection.title || "Untitled CV",
        updatedAt: new Date(),
      },
      create: {
        id,
        extractedJson,
        userId: candidate.id,
        title: cvSection.title || "Untitled CV",
        opportunityType: "FULL_TIME",
        cvType: "TECHNOLOGY", 
        language: "ES",
      },
    });

    const sectionsToSave = Object.entries(cvData)
      .map(([sectionId, sectionData]) => {
        const sectionConfig = sectionTypeMap[sectionId];
        if (!sectionConfig) {
          return null;
        }

        // Verificar si la sección tiene datos válidos
        const hasData = sectionData && 
          (Array.isArray(sectionData) ? sectionData.length > 0 :
           typeof sectionData === 'object' ? Object.keys(sectionData).length > 0 : 
           !!sectionData);

        if (!hasData) {
          return null;
        }

        return {
          type: sectionConfig.type,
          title: sectionConfig.title,
          data: sectionData,
          order: sectionConfig.order,
        };
      })
      .filter(Boolean);

    const existingSections = await prisma.cvSection.findMany({
      where: { cvId: cv.id },
    });

    for (const section of sectionsToSave) {
      const existingSection = existingSections.find(s => s.sectionType === section.type);

      if (existingSection) {
        await prisma.cvSection.update({
          where: { id: existingSection.id },
          data: {
            contentJson: section.data,
            title: section.title,
            order: section.order,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.cvSection.create({
          data: {
            cvId: cv.id,
            sectionType: section.type,
            contentJson: section.data,
            title: section.title,
            order: section.order,
          },
        });
      }
    }

    const sectionsToKeep = sectionsToSave.map(s => s.type);
    const sectionsToDelete = existingSections.filter(s => !sectionsToKeep.includes(s.sectionType));
    
    if (sectionsToDelete.length > 0) {
      await prisma.cvSection.deleteMany({
        where: {
          id: { in: sectionsToDelete.map(s => s.id) }
        }
      });
    }

    return {
      success: true,
      message: "CV data saved successfully.",
      data: cv,
    };

  } catch (error) {
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error while saving CV.",
    };
  }
};