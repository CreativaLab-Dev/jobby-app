"use client"

import { motion } from "framer-motion"
import type { Cv } from "@prisma/client"
import { CVCard } from "./cv-card"
import { CvWithRelations } from "../actions/get-cv-for-current-user"

interface CVGridProps {
  cvs: CvWithRelations[]
}

export function CVGrid({ cvs }: CVGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cvs.map((cv, index) => (
        <motion.div
          key={cv.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <CVCard cv={cv} />
        </motion.div>
      ))}
    </div>
  )
}
