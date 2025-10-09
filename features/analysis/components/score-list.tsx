"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const categoryMap = {
  "personalInformation": "Información Personal",
  "education": "Educación",
  "projectsExperience": "Proyectos y Experiencia",
  "skills": "Habilidades",
  "languages": "Idiomas",
  "certifications": "Certificaciones",
  "designAndLayout": "Diseño y Maquetación",
  "contentQuality": "Calidad del Contenido",
  "keywords": "Palabras Clave",
  "overall": "Puntuación General",
  "formatAndStructure": "Formato y Estructura",
  "formatPresentation": "Formato y Presentación",
  "formatAndPresentation": "Formato y Presentación",
  "length": "Longitud del CV",
  "customSections": "Secciones Personalizadas",
  "customKeywords": "Palabras Clave Personalizadas",
  "customDesign": "Diseño Personalizado",
  "customContent": "Contenido Personalizado",
  "customRecommendations": "Recomendaciones Personalizadas",
  "customOverall": "Puntuación General Personalizada"
}

interface ScoresListPageProps {
  cvAnalyzed: {
    id: string;
    cvTitle: string;
    overallScore: number;
    categories: Record<string, number>;
    recommendations: string[];
    date: string;
    trend: "up" | "down";
  }[]
  disabledButton?: boolean;
}

export function ScoresListPage({ cvAnalyzed, disabledButton }: ScoresListPageProps) {
  const [scores] = useState(cvAnalyzed)
  const router = useRouter()
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleUploadCV = () => {
    if (disabledButton) return
    router.push("/cv/upload")
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 h-full">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Scores de CVs
              </h1>
              <p className="text-gray-600 mt-2">Analiza el rendimiento y mejora tus currículums 🚀</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              disabled={disabledButton}
              onClick={handleUploadCV}>
              <Plus className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">✨ Subir CV</span>
            </Button>
          </div>

          {/* Scores List */}
          <div className="space-y-6">
            {scores.map((score, index) => (
              <motion.div
                key={score.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <CardTitle className="text-xl text-gray-800 flex items-center gap-3">
                            {score.cvTitle}
                            {score.trend === "up" ? (
                              <TrendingUp className="w-5 h-5 text-green-500" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-500" />
                            )}
                          </CardTitle>
                          <CardDescription>Analizado el {new Date(score.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="">
                          <Button variant="ghost" size="sm" className="ml-2 cursor-pointer text-purple-600 hover:text-purple-800 border-2 border-purple-300 hover:border-purple-500 transition-colors duration-200"
                            onClick={() => router.push(`/analysis/${score.id}`)}>
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(score.overallScore)}`}>
                          {score.overallScore}
                        </div>
                        <Badge className={getScoreBadgeColor(score.overallScore)}>
                          {score.overallScore >= 80
                            ? "Excelente"
                            : score.overallScore >= 60
                              ? "Bueno"
                              : "Necesita Mejora"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Categories Scores */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Puntuación por Categorías</h4>
                        <div className="space-y-3">
                          {Object.entries(score.categories).map(([category, categoryScore]) => (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">{categoryMap[category]}</span>
                                <span className={`font-medium ${getScoreColor(categoryScore)}`}>{categoryScore}%</span>
                              </div>
                              <Progress value={categoryScore} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">Recomendaciones de Mejora</h4>
                        <ul className="space-y-2">
                          {score.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {scores.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay scores disponibles</h3>
              <p className="text-gray-500">Crea y analiza tus CVs para ver los scores aquí</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
