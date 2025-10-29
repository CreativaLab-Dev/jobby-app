"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, ArrowLeft, Home } from "lucide-react"
import { useDownloadHandlers } from "@/hooks/use-download-handlers"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { CvDocument } from "@/app/(main)/test/components/cv-document"
import { CVData } from "@/types/cv"


interface ActionsSidebarProps {
  cvData: CVData
  onEditCV: () => void
  onHome: () => void
  isDisabled: boolean
}

export function ActionsSidebar({ cvData, onEditCV, onHome, isDisabled }: ActionsSidebarProps) {

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
        <PDFDownloadLink
          document={<CvDocument data={cvData} />}
          fileName={`${cvData.personal?.fullName ?? "cv"}.pdf`}
        >
          {({ loading }) => (

            <Button
              disabled={isDisabled || loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cursor-pointer mb-2"
            >
              <Download className="w-4 h-4 mr-2" />
              {loading ? "Generando PDF..." : "Descargar PDF"}
            </Button>
          )}
        </PDFDownloadLink>

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
