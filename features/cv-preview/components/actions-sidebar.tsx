"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home } from "lucide-react"
import { CVData } from "@/types/cv"

interface ActionsSidebarProps {
  cvData: CVData
  onEditCV: () => void
  onHome: () => void
  isDisabled: boolean
}

export function ActionsSidebar({ onEditCV, onHome, isDisabled }: ActionsSidebarProps) {

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Acciones</h3>
        <Button
          disabled={isDisabled}
          variant="outline"
          onClick={onHome} className="text-black w-full bg-transparent cursor-pointer border-gray-300 hover:bg-gray-100">
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>

        <Button
          disabled={isDisabled}
          variant="outline"
          onClick={onEditCV} className="text-black w-full bg-transparent cursor-pointer border-gray-300 hover:bg-gray-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Editar CV
        </Button>
      </CardContent>
    </Card>
  )
}
