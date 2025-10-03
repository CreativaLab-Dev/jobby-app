import type { ScoreCategory, ScoreItem } from "@/types/analysis"

// Iconos por categoría
const iconMap = {
  personalInformation: "User",
  education: "GraduationCap",
  projectsExperience: "Briefcase",
  skills: "Languages",
  formatAndPresentation: "FileText",
}


// Colores por categoría (puedes personalizar según el diseño)
const colorMap: Record<string, { color: string; bgColor: string }> = {
  "personalInformation": { color: "text-green-600", bgColor: "bg-green-100" },
  "education": { color: "text-blue-600", bgColor: "bg-blue-100" },
  "projectsExperience": { color: "text-orange-600", bgColor: "bg-orange-100" },
  "skills": { color: "text-purple-600", bgColor: "bg-purple-100" },
  "formatAndPresentation": { color: "text-indigo-600", bgColor: "bg-indigo-100" },
}

// Para traducir los nombres de secciones y campos
const sectionNameMap: Record<string, string> = {
  personalInformation: "Información Personal",
  education: "Educación",
  projectsExperience: "Proyectos/Experiencia",
  skills: "Habilidades",
  formatAndPresentation: "Formato y Presentación",
}

const fieldNameMap: Record<string, string> = {
  fullName: "Nombre completo",
  professionalEmail: "Email profesional",
  phoneNumber: "Teléfono",
  professionalSummary: "Resumen profesional",
  
  recognizedInstitution: "Institución reconocida",
  relevantDegree: "Título relevante",
  academicGPA: "Promedio académico",
  graduationYear: "Año de graduación",
  
  numberOfProjectsJobs: "Cantidad de proyectos",
  detailedDescriptions: "Descripción detallada",
  relevantTechnologies: "Tecnologías relevantes",
  quantifiableResults: "Resultados medibles",
  
  technicalSkills: "Habilidades técnicas",
  softSkills: "Habilidades blandas",
  languages: "Idiomas",
  relevanceToCareerGoals: "Relevancia al objetivo",
  
  clearStructure: "Estructura clara",
  grammarAndSpelling: "Ortografía y gramática",
  appropriateLength: "Longitud apropiada",
  professionalDesign: "Diseño profesional",
}

function getStatus(score: number): "complete" | "partial" | "missing" {
  if (score >= 20) return "complete"
  if (score >= 10) return "partial"
  return "missing"
}

export function mapToScoreCategories(
  sectionScores: any[],
  opportunityType: string
): ScoreCategory[] {
  return sectionScores.map((section) => {
    const key = section.sectionName as keyof typeof iconMap
    
    const items: ScoreItem[] = section.fieldScores.map((field: any) => ({
      name: fieldNameMap[field.fieldName] ?? field.fieldName,
      points: field.score,
      status: getStatus(field.score),
    }))
    const baseIcon = iconMap[key]
    const iconName =
      key === "projectsExperience" && ["becas", "practicas"].includes(opportunityType)
        ? "Code"
        : baseIcon
    
    return {
      category: sectionNameMap[key] ?? key,
      icon: iconName,
      score: section.score,
      maxScore: 100,
      ...colorMap[key],
      items,
    }
  })
}
