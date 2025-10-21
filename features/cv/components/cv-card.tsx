"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, Edit, Trash2 } from "lucide-react"
import type { CV } from "@prisma/client"
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/format-date"

interface CVCardProps {
  cv: CV
}

const statusMapper = {
  CREATED: "Creado",
  ANALYZED: "Analizado",
  REVISED: "Revisado",
  COMPLETED: "Completado",
  PUBLISHED: "Publicado",
  ARCHIVED: "Archivado",
}

export function CVCard({ cv }: CVCardProps) {
  const isCompleted = cv.status === "ANALYZED"
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/cv/${cv.id}/edit`)
  }

  const handleSeeDetail = () => {
    router.push(`/cv/${cv.id}/preview`)
  }

  const handleDelete = () => {
    // Función vacía por ahora, se implementará después
    console.log('Borrar CV:', cv.id)
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <FileText className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-2">
            <Badge
              variant={isCompleted ? "default" : "secondary"}
              className={isCompleted ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
            >
              {statusMapper[cv.status] || "Estado desconocido"}
            </Badge>
            <Button 
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
          {cv?.title || <span className="text-gray-400">Sin título</span>}
        </CardTitle>
        <CardDescription>Tipo: {cv?.type || <span className="text-gray-400">No especificado</span>}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p>Creado: {formatDate(cv.createdAt, "dd/MM/yyyy")}</p>
          <p>Modificado: {formatDate(cv.updatedAt, "dd/MM/yyyy")}</p>
        </div>
        <div className=" flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="border-gray-200 hover:border-gray-300 hover:bg-gray-100 text-black flex-1 bg-transparent cursor-pointer"
            onClick={handleSeeDetail}
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="border-gray-200 hover:border-gray-300 hover:bg-gray-100 text-black flex-1 bg-transparent cursor-pointer"
            onClick={handleEdit}
          >
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}