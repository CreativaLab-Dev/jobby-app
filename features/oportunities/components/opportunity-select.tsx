"use client"

import { FC } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {opportunityTypes} from "@/features/oportunities/data/opportunityTypes";

interface OpportunitySelectProps {
  value: string
  onChange: (value: string) => void
}

export const OpportunitySelect: FC<OpportunitySelectProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-14 text-lg">
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        {opportunityTypes.map((type) => (
          <SelectItem key={type.value} value={type.value} className="h-12">
            <div className="flex items-center space-x-3">
              <type.icon className={`w-5 h-5 ${type.color}`} />
              <span>{type.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
