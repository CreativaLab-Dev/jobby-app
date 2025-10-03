"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Crear CV Profesional </h1>
        <Badge variant="outline" className="text-lg px-4 py-2 mx-2">
          {currentStep + 1} de {totalSteps}
        </Badge>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
