"use client"

import { Button } from "@/components/ui/button"

interface NavigationButtonsProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

export function NavigationButtons({ currentStep, totalSteps, onPrevious, onNext }: NavigationButtonsProps) {
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onPrevious} disabled={isFirstStep} className="px-8 bg-transparent cursor-pointer">
        ← Anterior
      </Button>
      <Button
        onClick={onNext}
        className="px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 cursor-pointer"
      >
        {isLastStep ? "Finalizar" : "Siguiente →"}
      </Button>
    </div>
  )
}
