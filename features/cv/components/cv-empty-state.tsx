"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"

export function CVEmptyState() {
  
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes CVs creados</h3>
        <p className="text-gray-500 mb-6">Comienza creando tu primer currículum</p>
      </motion.div>
      
    </>
  )
}
