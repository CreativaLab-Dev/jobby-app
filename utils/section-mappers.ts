// ---- features/cv/utils/section-mappers.ts ----
import { CvSectionType } from "@prisma/client";
import { parseSectionItems, safeDate } from "./section-utils";
import { title } from "process";
import { Description } from "@radix-ui/react-toast";
import { date } from "zod";

export const mapPersonalSection = (cv: any, getSection: (t: CvSectionType) => any) => {
  const summarySection = getSection(CvSectionType.SUMMARY);
  const contactSection = getSection(CvSectionType.CONTACT);
  const contactItems = parseSectionItems(contactSection);

  const contact = contactItems.reduce((acc: any, item: any) => {
    if (!item || typeof item !== "object") return acc;
    Object.entries(item).forEach(([key, value]) => {
      const lower = key.toLowerCase();
      if (["fullname", "full_name"].includes(lower)) acc.fullName = value;
      if (["email"].includes(lower)) acc.email = value;
      if (["phone", "phonenumber"].includes(lower)) acc.phone = value;
      if (["linkedin"].includes(lower)) acc.linkedin = value;
      if (["address"].includes(lower)) acc.address = value;
      if (["summary", "professionalSummary".toLowerCase()].includes(lower)) acc.summary = value;
    });
    return acc;
  }, {});

  const legacy = {
    fullName: cv.fullName || "",
    address: cv.address || "",
    linkedin: cv.linkedin || "",
    summary: cv.professionalSummary || "",
    phone: cv.phone || "",
    email: cv.email || "",
  };

  const summaryText = parseSectionItems(summarySection)[0]?.text ?? contact.summary ?? legacy.summary;

  return {
    fullName: contact.fullName ?? legacy.fullName,
    address: contact.address ?? legacy.address,
    linkedin: contact.linkedin ?? legacy.linkedin,
    summary: summaryText,
    phone: contact.phone ?? legacy.phone,
    email: contact.email ?? legacy.email,
  };
};

export const mapEducationSection = (section: any, legacy: any[] = []) => {
  const items = section ? parseSectionItems(section) : legacy;
  return {
    items: items.map((educ: any) => ({
      id: educ.id ?? educ.uuid ?? "",
      institution: educ.institution ?? educ.school ?? "",
      location: educ.location ?? "",
      title: educ.title ?? educ.degree ?? "",
      level: educ.level ?? "",
      year: educ.year ?? educ.graduationYear ?? "",
      honors: educ.honors ?? educ.notes ?? "",
    })),
  };
};

export const mapExperienceSection = (section: any, legacy: any[] = []) => {
  const items = section ? parseSectionItems(section) : legacy;
  return {
    items: items.map((exp: any) => ({
      id: exp.id ?? "",
      position: exp.position ?? exp.title ?? "",
      company: exp.company ?? exp.employer ?? "",
      location: exp.location ?? "",
      duration:
        exp.duration ??
        ((exp.startDate || exp.endDate) ? `${safeDate(exp.startDate)} - ${safeDate(exp.endDate)}` : ""),
      responsibilities: exp.responsibilities ?? exp.description ?? "",
    })),
  };
};

export const mapCertificationsSection = (section: any, legacy: any[] = []) => {
  const items = section ? parseSectionItems(section) : legacy;
  return {
    items: items.map((cert: any) => ({
      id: cert.id ?? "",
      name: cert.name ?? cert.name ?? "",
      issuer: cert.issuer ?? cert.issuer ?? "",
      date: cert.date ?? cert.date ?? "",
    })),
  };
};

export const mapProjectsSection = (section: any, legacy: any[] = []) => {
  const items = section ? parseSectionItems(section) : legacy;
  return {
    items: items.map((proj: any) => ({
      id: proj.id ?? "",
      tittle: proj.tittle ?? proj.tittle ?? "",
      description: proj.description ?? proj.description ?? "",
      technologies: proj.technologies ?? proj.technologies ?? "",
      duration: proj.duration ?? proj.duration ?? "",
    })),
  };
};

export const mapAchievementsSection = (section: any, legacy: any[] = []) => {
  const items = section ? parseSectionItems(section) : legacy;
  return {
    items: items.map((achi: any) => ({
      id: achi.id ?? "",
      tittle: achi.tittle ?? achi.tittle ?? "",
      description: achi.description ?? achi.description ?? "",
      date: achi.date ?? achi.date ?? "",
    })),
  };
};

export const mapSkillsSection = (section: any, legacy: any[] = []) => {
  const items = section ? parseSectionItems(section) : legacy;
  return {
    items: items.map((skills: any) => ({
      technical: skills.technical ?? "",
      soft: skills.soft ?? skills.tittle ?? "",
      languages: skills.languages ?? skills.languages ?? "",
    })),
  };
};