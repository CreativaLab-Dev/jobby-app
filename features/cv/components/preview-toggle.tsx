"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface PreviewToggleProps {
  showPreview: boolean
  onToggle: () => void
}

export function PreviewToggle({ showPreview, onToggle }: PreviewToggleProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant={showPreview ? "default" : "outline"}
        onClick={onToggle}
        className={`flex items-center gap-2 px-6 py-3 text-base font-semibold transition-all duration-300 ${
          showPreview
            ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl"
            : "border-2 border-purple-500 text-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-600 hover:text-white hover:border-transparent bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
        }`}
      >
        <motion.div
          animate={showPreview ? { rotate: 0 } : { rotate: [0, -10, 10, 0] }}
          transition={{
            duration: showPreview ? 0.3 : 2,
            repeat: showPreview ? 0 : Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <Eye className="w-5 h-5" />
        </motion.div>
        {showPreview ? "Ocultar Vista Previa" : "Ver Vista Previa"}
        {!showPreview && (
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
            className="ml-1"
          >
            ✨
          </motion.div>
        )}
      </Button>
    </motion.div>
  )
}
