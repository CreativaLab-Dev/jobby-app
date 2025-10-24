// ---- features/cv/utils/transform-cv-to-dto.ts ----
import { CVData } from "@/types/cv";
import { mapEducationSection, mapExperienceSection, mapPersonalSection, mapCertificationsSection, mapProjectsSection, mapAchievementsSection, mapSkillsSection} from "@/utils/section-mappers";
import { mapSectionsByType } from "@/utils/section-utils";
import { CvSectionType } from "@prisma/client";
import { CvWithSections } from "../actions/get-cv-by-id";

export function transformCVToDTO(cv: CvWithSections): CVData {
  const sections = mapSectionsByType(cv.sections);
  const getSection = (type: CvSectionType) => sections.get(type);

  const personal = mapPersonalSection(cv, getSection);
  const education = mapEducationSection(getSection(CvSectionType.EDUCATION), cv.sections);
  const experience = mapExperienceSection(getSection(CvSectionType.EXPERIENCE), cv.sections);

  // Add other sections using similar mappers
  const certifications = mapCertificationsSection(getSection(CvSectionType.CERTIFICATIONS), cv.sections);
  const projects = {}; mapProjectsSection((CvSectionType.PROJECTS), cv.sections);
  // const achievements = mapAchievementsSection((CvSectionType.), cv.sections);
  const skills = mapSkillsSection((CvSectionType.SKILLS), cv.sections);

  return {
    personal,
    education,
    experience,
    certifications,
    projects,
    skills,
  };
}
