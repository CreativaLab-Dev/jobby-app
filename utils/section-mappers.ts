// ---- features/cv/utils/section-mappers.ts ----
import { CvSectionType } from "@prisma/client";
import { parseSectionItems, safeDate } from "./section-utils";

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
