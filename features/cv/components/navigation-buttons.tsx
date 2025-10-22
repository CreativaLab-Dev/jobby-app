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
      <Button variant="outline" onClick={onPrevious} disabled={isFirstStep} className="border-gray-300 px-8 bg-transparent cursor-pointer">
        <span className="text-black">← </span>
        <span className="text-black hidden md:inline-block">Anterior</span>
      </Button>
      <Button
        onClick={onNext}
        className="px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 cursor-pointer"
      >
        <span className="hidden md:inline-block">
          {isLastStep ? "Finalizar" : "Siguiente"}
        </span>
        <span> →</span>
      </Button>
    </div>
  )
}
