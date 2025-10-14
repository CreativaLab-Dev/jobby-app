"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  GraduationCap,
  FileText,
  BarChart3,
  TrendingUp,
  Sparkles,
  Target,
  Award,
  ArrowRight,
  Users,
  // CheckCircle,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: FileText,
    title: "Crear CVs Inteligentes",
    description: "Genera currículums optimizados con IA según tu área profesional",
    color: "from-emerald-400 to-emerald-600",
    href: "/cv",
  },
  {
    icon: BarChart3,
    title: "Análisis de Scores",
    description: "Obtén puntuaciones detalladas y recomendaciones de mejora",
    color: "from-purple-400 to-purple-600",
    href: "/scores",
  },
  {
    icon: TrendingUp,
    title: "Nuevas Oportunidades",
    description: "Descubre oportunidades académicas y profesionales personalizadas",
    color: "from-orange-400 to-orange-600",
    href: "/opportunities",
  },
]

const stats = [
  { number: "1000+", label: "CVs Creados", icon: FileText },
  { number: "95%", label: "Tasa de Éxito", icon: Target },
  { number: "500+", label: "Usuarios Activos", icon: Users },
  { number: "4.9/5", label: "Calificación", icon: Award },
]

export function HomePage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 mb-8"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-indigo-700">Potenciado con Inteligencia Artificial</span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
            >
              CV Score
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Transforma tu carrera profesional con currículums inteligentes y análisis personalizados
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/onboarding">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/cv">
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 bg-transparent cursor-pointer"
                >
                  Ver Mis CVs
                </Button>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </section>
      
      {/* Features Section */}
      <section className="px-6 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todo lo que necesitas para destacar</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas inteligentes para crear, analizar y mejorar tu perfil profesional
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link href={feature.href}>
                  <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardHeader className="text-center pb-4">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-gray-600 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      {/*<section className="px-6 py-20">*/}
      {/*  <div className="max-w-4xl mx-auto">*/}
      {/*    <motion.div*/}
      {/*      initial={{ opacity: 0, y: 30 }}*/}
      {/*      whileInView={{ opacity: 1, y: 0 }}*/}
      {/*      transition={{ duration: 0.8 }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*    >*/}
      {/*      <Card className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 border-0 shadow-2xl">*/}
      {/*        <CardContent className="p-12 text-center text-white">*/}
      {/*          <motion.div*/}
      {/*            initial={{ opacity: 0, scale: 0.8 }}*/}
      {/*            whileInView={{ opacity: 1, scale: 1 }}*/}
      {/*            transition={{ delay: 0.2, duration: 0.6 }}*/}
      {/*            viewport={{ once: true }}*/}
      {/*            className="mb-6"*/}
      {/*          >*/}
      {/*            <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-90" />*/}
      {/*          </motion.div>*/}
      {/*          */}
      {/*          <h3 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para impulsar tu carrera?</h3>*/}
      {/*          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">*/}
      {/*            Únete a miles de profesionales que ya están transformando sus oportunidades laborales*/}
      {/*          </p>*/}
      {/*          */}
      {/*          <div className="flex flex-col sm:flex-row gap-4 justify-center">*/}
      {/*            <Link href="/onboarding">*/}
      {/*              <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">*/}
      {/*                <CheckCircle className="w-5 h-5 mr-2" />*/}
      {/*                Empezar Gratis*/}
      {/*              </Button>*/}
      {/*            </Link>*/}
      {/*          </div>*/}
      {/*        </CardContent>*/}
      {/*      </Card>*/}
      {/*    </motion.div>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </div>
  )
}
