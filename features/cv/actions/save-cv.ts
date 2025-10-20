"use server";

import { CVData } from "@/types/cv";
import { getCandidate } from "@/features/share/actions/get-candidate";
import { CV, EducationLevel } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const saveCV = async (id: string, cvData: CVData) => {
  try {
    const candidate = await getCandidate();
    if (!candidate) {
      return { success: false, message: "Candidate not found." };
    }

    const educationItems = cvData.education?.items ?? [];
    const projectItems = cvData.projects?.items ?? [];
    const achievementItems = cvData.achievements?.items ?? [];
    const skillsSoft = cvData.skills?.soft ?? [];
    const skillsTech = cvData.skills?.technical ?? [];
    const skillsLang = cvData.skills?.languages ?? [];

    const nestedEducation = educationItems
    .filter((e) =>
      e.level && ["PRIMARIA", "SECUNDARIA", "TECNICO", "BACHILLER", "LICENCIADO", "MAESTRIA", "DOCTORADO", "OTRO"].includes(e.level)
    )
    .map((e) => ({
      level: e.level as EducationLevel,
      title: e.title!,
      institution: e.institution!,
      location: e.location,
      graduationYear: e.year ? parseInt(e.year, 10) : null,
      year: e.year,
      honors: e.honors,
    }));


    const nestedProjects = projectItems.map((p) => ({
      title: p.title!,
      description: p.description!,
      technologies: p.technologies,
      duration: p.duration,
    }));

    const nestedAchievements = achievementItems.map((a) => ({
      title: a.title!,
      description: a.description!,
      date: a.date ? new Date(a.date) : null,
    }));

    const nestedCertifications = cvData.certifications?.items?.map((c) => ({
      name: c.name!,
      issuer: c.issuer!,
      issueDate: c.date ? new Date(c.date) : null,
    })) ?? [];

    const nestedExperience = cvData.experience?.items?.map((e) => ({
      position: e.position!,
      company: e.company!,
      location: e.location,
      duration: e.duration,
      responsibilities: e.responsibilities,
      startDate: new Date(Date.now()), // Cambia si tienes un campo real
    })) ?? [];

    const nestedSkills = [
      ...skillsSoft.map((s) => ({ name: s, category: "BLANDA" as const })),
      ...skillsTech.map((s) => ({ name: s, category: "TECNICA" as const })),
      ...skillsLang.map((s) => ({ name: s, category: "IDIOMA" as const })),
    ];

    const response = await prisma.cV.upsert({
      where: { id },
      update: {
        fullName: cvData.personal?.fullName,
        address: cvData.personal?.address,
        linkedin: cvData.personal?.linkedin,
        email: cvData.personal?.email,
        phone: cvData.personal?.phone,
        professionalSummary: cvData.personal?.summary,
        candidateId: candidate.id,
        education: {
          deleteMany: {},
          create: nestedEducation,
        },
        academicProjects: {
          deleteMany: {},
          create: nestedProjects,
        },
        achievements: {
          deleteMany: {},
          create: nestedAchievements,
        },
        skills: {
          deleteMany: {},
          create: nestedSkills,
        },
        certifications: {
          deleteMany: {},
          create: nestedCertifications,
        },
        experience: {
          deleteMany: {},
          create: nestedExperience,
        },
      },
      create: {
        id,
        createdWithBuilder: true,
        candidateId: candidate.id,
        fullName: cvData.personal?.fullName,
        address: cvData.personal?.address,
        linkedin: cvData.personal?.linkedin,
        email: cvData.personal?.email,
        phone: cvData.personal?.phone,
        professionalSummary: cvData.personal?.summary,
        education: {
          create: nestedEducation,
        },
        academicProjects: {
          create: nestedProjects,
        },
        achievements: {
          create: nestedAchievements,
        },
        skills: {
          create: nestedSkills,
        },
        certifications: {
          create: nestedCertifications,
        },
        experience: {
          create: nestedExperience,
        },
      },
    });

    return {
      success: true,
      message: "CV data saved successfully.",
      data: response as CV,
    };
  } catch (error: any) {
    console.error("[SAVE_CV_ERROR]", error);

    return {
      success: false,
      message: error?.message || "Unexpected error while saving CV.",
    };
  }
};
