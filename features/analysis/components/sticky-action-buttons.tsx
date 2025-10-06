"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Target } from "lucide-react"

interface StickyActionButtonsProps {
  show: boolean
}

export function StickyActionButtons({ show }: StickyActionButtonsProps) {

  const handleGoCreativaAcademy = () => {
    window.open("https://creative-lab-lms.vercel.app/auth/login", "_blank");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t-2 border-gray-100 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  size="lg"
                  className="w-full px-6 py-4 text-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={handleGoCreativaAcademy}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                  >
                    <Users className="w-5 h-5 mr-2" />
                  </motion.div>
                  Potenciarme con un Experto
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 2,
                    }}
                    className="ml-2"
                  >
                    ✨
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full px-6 py-4 text-lg border-2 bg-white/90 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 4,
                    }}
                  >
                    <Target className="w-5 h-5 mr-2" />
                  </motion.div>
                  Ver Más Oportunidades
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                    className="ml-2"
                  >
                    🚀
                  </motion.div>
                </Button>
              </motion.div>
            </div>
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
              className="flex justify-center mt-2"
            >
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
