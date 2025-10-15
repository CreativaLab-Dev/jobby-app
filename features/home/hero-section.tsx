"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, 
  Target, 
  Rocket,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)
  
  const words = ["extraordinario", "único", "ganador", "perfecto"]
  
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [words.length])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Revoluciona tu carrera profesional</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-black leading-none"
              >
                Crea el CV
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                  {words[currentWord]}
                </motion.span>
                que necesitas
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-blue-100 leading-relaxed max-w-xl"
              >
                <strong className="text-white">Frase ejemplo: </strong>No más CVs ignorados. Nuestra IA analiza tu perfil y crea un currículum que 
                <strong className="text-white"> multiplica tus oportunidades por 10.</strong>
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 cursor-pointer"
                >
                  <Rocket className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  Empezar ahora gratis
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 pt-8 border-t border-white/20"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">Valor %</div>
                <div className="text-sm text-blue-200">Hito 1</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">Valor X</div>
                <div className="text-sm text-blue-200">Hito 2</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">Valor H</div>
                <div className="text-sm text-blue-200">Hito 3</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative lg:pl-8"
          >
            <div className="relative">
              {/* Main CV Preview Card */}
              <motion.div
                animate={{ 
                  y: [-15, 15, -15],
                  rotateY: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                <Card className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 overflow-hidden">
                  <CardContent className="p-0 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        JP
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Juan Perez</h3>
                        <p className="text-gray-600">Profesión</p>
                      </div>
                      <div className="ml-auto">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          IA Optimizado
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700 font-medium">Compatibilidad ATS</span>
                          <span className="text-green-600 font-bold">98%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "98%" }}
                            transition={{ duration: 2, delay: 1 }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700 font-medium">Match con ofertas</span>
                          <span className="text-blue-600 font-bold">94%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "94%" }}
                            transition={{ duration: 2, delay: 1.5 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-gray-200">
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <span className="font-semibold text-green-800">Listo para enviar</span>
                        </div>
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Floating Success Indicators */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -left-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-2xl shadow-2xl"
              >
                <Target className="w-8 h-8" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-xl"
              >
                <Users className="w-6 h-6" />
              </motion.div>

              <motion.div
                animate={{ 
                  rotate: [0, -15, 15, 0] 
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg shadow-lg"
              >
                <Zap className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}