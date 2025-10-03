"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

export function AnalysisHeader() {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6"
      >
        <TrendingUp className="w-8 h-8 text-white" />
      </motion.div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Análisis Completo de tu CV</h1>
      <p className="text-xl text-gray-600">Descubre tu potencial y las mejores oportunidades para ti</p>
    </div>
  )
}
