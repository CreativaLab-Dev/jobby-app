export const mapSectionsByType = (sections: any[] = []) => {
  const map = new Map<string, any>();
  for (const s of sections) {
    if (s?.sectionType) map.set(s.sectionType, s);
  }
  return map;
};

export const parseSectionItems = (section: any): any[] => {
  if (!section) return [];
  const json = section.contentJson ?? section.content ?? null;

  if (Array.isArray(json)) return json;

  if (json && typeof json === "object") {
    if (Array.isArray(json.items)) return json.items;
    if (Array.isArray(json.entries)) return json.entries;
    return [json];
  }

  if (typeof json === "string") {
    try {
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [{ text: json }];
    }
  }

  return [];
};

export const safeDate = (d: any): string => {
  if (!d) return "";
  try {
    const date = typeof d === "string" ? new Date(d) : d instanceof Date ? d : new Date(d);
    return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
  } catch {
    return "";
  }
};
