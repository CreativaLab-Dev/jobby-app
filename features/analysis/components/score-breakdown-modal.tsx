"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calculator, X, CheckCircle, AlertTriangle, Info } from "lucide-react"
import type { ScoreCategory } from "@/types/analysis"

interface ScoreBreakdownModalProps {
  show: boolean
  onClose: () => void
  scoreBreakdown: Array<ScoreCategory & { Icon?: React.FC<React.SVGProps<SVGSVGElement>> }>
  totalScore: number
}

export function ScoreBreakdownModal({ show, onClose, scoreBreakdown, totalScore }: ScoreBreakdownModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calculator className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Desglose del Score</h2>
                    <p className="text-indigo-100">Cómo se calculó tu puntuación de {totalScore}/100</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {scoreBreakdown.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-6 bg-gray-50/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.bgColor}`}>
                          {category.Icon && <category.Icon className={`w-6 h-6 ${category.color}`} />}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{category.category}</h3>
                          <p className="text-sm text-gray-600">
                            {category.score}/{category.maxScore} puntos
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${category.color}`}>
                          {Math.round((category.score / category.maxScore) * 100)}%
                        </div>
                        <Progress value={(category.score / category.maxScore) * 100} className="w-24 h-2 mt-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between py-2 px-3 bg-white rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                item.status === "complete"
                                  ? "bg-green-500"
                                  : item.status === "partial"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            />
                            <span className="text-sm text-gray-700">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">{item.points} pts</span>
                            {item.status === "complete" && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {item.status === "partial" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                            {item.status === "missing" && <X className="w-4 h-4 text-red-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-indigo-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-2">¿Cómo mejorar tu score?</h4>
                    <ul className="text-sm text-indigo-700 space-y-1">
                      <li>• Completa todos los campos obligatorios</li>
                      <li>• Agrega más proyectos con resultados medibles</li>
                      <li>• Incluye certificaciones relevantes</li>
                      <li>• Mejora la descripción de tus logros</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
