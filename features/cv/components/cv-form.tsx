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
import { CvType, OpportunityType } from "@prisma/client"

interface CVFormData {
  title: string
  cvType: CvType
  opportunityType: OpportunityType
}

interface CVFormProps {
  formData: CVFormData
  onFormDataChange: (data: CVFormData) => void
}

const cvTypes = [
  CvType.TECHNOLOGY,
  CvType.DESIGN,
  CvType.MARKETING,
  CvType.SALES,
  CvType.SOCIAL_MEDIA,
  CvType.FINANCE,
]

export const opportunityTypes: OpportunityType[] = [
  OpportunityType.INTERNSHIP,
  OpportunityType.SCHOLARSHIP,
  OpportunityType.EXCHANGE_PROGRAM,
  OpportunityType.RESEARCH_FELLOWSHIP,
  OpportunityType.GRADUATE_PROGRAM,
  OpportunityType.FREELANCE,
  OpportunityType.FULL_TIME,
  OpportunityType.PART_TIME,
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
          placeholder="Ejemplo: CV Ingeniero de Software"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          className="w-full border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="opportunity" className="text-sm font-medium text-gray-700">
          Tipo de Oportunidad
        </Label>
        <Select
          value={formData.opportunityType}
          onValueChange={(value) =>
            updateFormData({ opportunityType: value as OpportunityType })
          }
        >
          <SelectTrigger className="bg-white text-black w-full border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400">
            <SelectValue placeholder="Selecciona el tipo de oportunidad" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-gray-200">
            {opportunityTypes.map((type) => (
              <SelectItem className="focus:bg-gray-100 focus:text-black" key={type} value={type}>
                {type}
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
          value={formData.cvType}
          onValueChange={(value) =>
            updateFormData({
              cvType: value as CvType
            })
          }
        >
          <SelectTrigger className="bg-white text-black w-full border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400">
            <SelectValue placeholder="Selecciona el tipo de CV" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border-gray-200">
            {cvTypes.map((type) => (
              <SelectItem className="focus:bg-gray-100 focus:text-black" key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
