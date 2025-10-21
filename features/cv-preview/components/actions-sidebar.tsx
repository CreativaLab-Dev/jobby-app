"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, ArrowLeft } from "lucide-react"
import { useDownloadHandlers } from "@/hooks/use-download-handlers"

interface CVData {
  [key: string]: unknown
}

interface ActionsSidebarProps {
  cvData: CVData
  opportunityType: string
  onEditCV: () => void
  isDisabled: boolean
}

export function ActionsSidebar({ cvData, opportunityType, onEditCV, isDisabled }: ActionsSidebarProps) {
  const { handleDownloadPDF, handleDownloadWord } = useDownloadHandlers(cvData, opportunityType)

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Acciones</h3>

        <Button
          onClick={handleDownloadPDF}
          disabled={isDisabled}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cursor-pointer"
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar PDF
        </Button>

        <Button
          disabled={isDisabled}
          onClick={handleDownloadWord}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2" />
          Descargar Word
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
