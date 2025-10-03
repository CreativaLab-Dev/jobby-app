import {
  AlertTriangle,
  Lightbulb,
  CheckCircle,
} from "lucide-react"
import type { Recommendation, Opportunity } from "@/types/analysis"

export const recommendations: Recommendation[] = [
  {
    type: "critical",
    icon: AlertTriangle,
    title: "Agrega más proyectos relevantes",
    description: "Incluye al menos 2-3 proyectos que demuestren tus habilidades técnicas.",
    impact: "Alto",
  },
  {
    type: "important",
    icon: Lightbulb,
    title: "Mejora tu resumen profesional",
    description: "Hazlo más específico y orientado a tus objetivos académicos.",
    impact: "Medio",
  },
  {
    type: "suggestion",
    icon: CheckCircle,
    title: "Incluye certificaciones relevantes",
    description: "Agrega cursos online o certificaciones que complementen tu perfil.",
    impact: "Medio",
  },
]

export const opportunities: Opportunity[] = [
  {
    title: "Beca de Excelencia Académica CONACYT",
    match: 92,
    type: "Beca Nacional",
    deadline: "15 de Marzo, 2024",
    requirements: ["Promedio mínimo 8.5", "Proyecto de investigación", "Carta de motivos"],
    url: "#",
  },
  {
    title: "Programa Erasmus+ Europa",
    match: 87,
    type: "Intercambio Internacional",
    deadline: "30 de Abril, 2024",
    requirements: ["Nivel B2 de inglés", "Carta de recomendación", "Ensayo académico"],
    url: "#",
  },
  {
    title: "Beca Fulbright Estados Unidos",
    match: 84,
    type: "Beca Internacional",
    deadline: "1 de Mayo, 2024",
    requirements: ["TOEFL 100+", "GRE", "Experiencia investigación"],
    url: "#",
  },
  {
    title: "Programa de Movilidad UNAM",
    match: 81,
    type: "Intercambio Nacional",
    deadline: "20 de Febrero, 2024",
    requirements: ["Promedio 8.0+", "Carta de motivos", "Aval académico"],
    url: "#",
  },
  {
    title: "Beca de Investigación MIT",
    match: 76,
    type: "Investigación",
    deadline: "10 de Junio, 2024",
    requirements: ["Publicaciones", "Proyecto innovador", "Referencias académicas"],
    url: "#",
  },
]
