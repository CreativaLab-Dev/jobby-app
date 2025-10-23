// ---- features/cv/utils/transform-cv-to-dto.ts ----
import { CVData } from "@/types/cv";
import { mapEducationSection, mapExperienceSection, mapPersonalSection } from "@/utils/section-mappers";
import { mapSectionsByType } from "@/utils/section-utils";
import { Cv, CvSectionType } from "@prisma/client";
import { CvWithSections } from "../actions/get-cv-by-id";

export function transformCVToDTO(cv: CvWithSections): CVData {
  const sections = mapSectionsByType(cv.sections);
  const getSection = (type: CvSectionType) => sections.get(type);

  const personal = mapPersonalSection(cv, getSection);
  const education = mapEducationSection(getSection(CvSectionType.EDUCATION), cv.sections);
  const experience = mapExperienceSection(getSection(CvSectionType.EXPERIENCE), cv.sections);

  // Add other sections using similar mappers
  const certifications = {}; // TODO: mapCertificationsSection(...)
  const projects = {}; // TODO: mapProjectsSection(...)
  const achievements = {}; // TODO: mapAchievementsSection(...)
  const skills = {}; // TODO: mapSkillsSection(...)

  return {
    personal,
    education,
    experience,
    certifications,
    projects,
    achievements,
    skills,
  };
}
