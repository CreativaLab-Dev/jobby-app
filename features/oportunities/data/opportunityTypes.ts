import { Briefcase, GraduationCap, Award, Users, Sparkles } from "lucide-react"
import {OpportunityType} from "@/features/oportunities/types/opportunity";

export const opportunityTypes: OpportunityType[] = [
  { value: "practicas", label: "Prácticas Profesionales", icon: Briefcase, color: "text-blue-500" },
  { value: "becas", label: "Becas de Estudio", icon: GraduationCap, color: "text-green-500" },
  { value: "maestrias", label: "Maestrías y Posgrados", icon: Award, color: "text-purple-500" },
  { value: "intercambios", label: "Intercambios Académicos", icon: Users, color: "text-orange-500" },
  { value: "investigacion", label: "Proyectos de Investigación", icon: Sparkles, color: "text-pink-500" },
]
