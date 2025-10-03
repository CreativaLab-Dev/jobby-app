"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, Calendar, Edit } from "lucide-react"
import type { CV } from "@prisma/client"

interface CVStatsCardsProps {
  cvs: CV[]
}

export function CVStatsCards({ cvs }: CVStatsCardsProps) {
  const completedCount = cvs.filter((cv) => cv.status === "COMPLETED").length
  const inProgressCount = cvs.filter((cv) => cv.status === "ANALYZED").length

  const stats = [
    {
      title: "CVs Totales",
      value: cvs.length,
      icon: FileText,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Completados",
      value: completedCount,
      icon: Calendar,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      title: "En Progreso",
      value: inProgressCount,
      icon: Edit,
      gradient: "from-orange-400 to-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
