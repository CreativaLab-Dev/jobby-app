"use client"

import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { opportunityTypes } from "@/features/oportunities/data/opportunityTypes"

interface CVFormData {
  title: string
  opportunity: string
  type: string
  customType: string
}

interface CVFormProps {
  formData: CVFormData
  onFormDataChange: (data: CVFormData) => void
}

const cvTypes = [
  "Tecnología",
  "Desarrollo de Software",
  "Ciencia de Datos",
  "Inteligencia Artificial",
  "Ciberseguridad",
  "Marketing Digital",
  "Marketing Tradicional",
  "Redes Sociales",
  "Ventas",
  "Atención al Cliente",
  "Recursos Humanos",
  "Finanzas",
  "Contabilidad",
  "Educación",
  "Investigación",
  "Salud",
  "Medicina",
  "Enfermería",
  "Ingeniería Civil",
  "Ingeniería Industrial",
  "Ingeniería Mecánica",
  "Arquitectura",
  "Diseño Gráfico",
  "Diseño UX/UI",
  "Diseño Industrial",
  "Consultoría",
  "Gestión de Proyectos",
  "Administración",
  "Logística",
  "Turismo",
  "Gastronomía",
  "Arte y Cultura",
  "Comunicación",
  "Periodismo",
  "Derecho",
  "Psicología",
  "Trabajo Social",
  "Otro",
]

export function CVForm({ formData, onFormDataChange }: CVFormProps) {
  const updateFormData = (updates: Partial<CVFormData>) => {
    onFormDataChange({ ...formData, ...updates })
  }
  
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium text-gray-700">
          Título del CV
        </Label>
        <Input
          id="title"
          placeholder="Ej: CV Desarrollador Frontend"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="opportunity" className="text-sm font-medium text-gray-700">
          Tipo de Oportunidad
        </Label>
        <Select
          value={formData.opportunity}
          onValueChange={(value) =>
            updateFormData({ opportunity: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el tipo de oportunidad" />
          </SelectTrigger>
          <SelectContent>
            {opportunityTypes.map((type) => (
              <SelectItem key={type.label} value={type.label}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type" className="text-sm font-medium text-gray-700">
          Tipo de CV
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value) =>
            updateFormData({
              type: value,
              customType: value === "Otro" ? formData.customType : "",
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el tipo de CV" />
          </SelectTrigger>
          <SelectContent>
            {cvTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {formData.type === "Otro" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <Label htmlFor="customType" className="text-sm font-medium text-gray-700">
            Especifica el tipo de CV
          </Label>
          <Input
            id="customType"
            placeholder="Ej: Especialista en Blockchain"
            value={formData.customType}
            onChange={(e) => updateFormData({ customType: e.target.value })}
            className="w-full"
          />
        </motion.div>
      )}
    </div>
  )
}
