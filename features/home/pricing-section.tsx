"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Brain, 
  Zap, 
  Shield, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "IA Revolucionaria",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: "from-purple-500 to-indigo-600",
    stats: "Estimaciones"
  },
  {
    icon: Zap,
    title: "Resultados Instantáneos",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: "from-yellow-500 to-orange-600",
    stats: "< 1 minuto en promedio"
  },
  {
    icon: Shield,
    title: "Garantía de Efectividad",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    color: "from-green-500 to-emerald-600",
    stats: "Estimaciones"
  }
]

const benefits = [
  "EJEMPLOS:",
  "Análisis profundo con IA especializada",
  "Optimización para sistemas ATS",
  "Plantillas para +50 industrias",
  "Seguimiento de aplicaciones",
  "Soporte 24/7 por chat",
  "Actualizaciones ilimitadas"
]

export function PricingSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Tecnología de vanguardia</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
            ¿Por qué somos diferentes?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-gray-900">Ejemplo:</strong> No creamos CVs bonitos. Creamos CVs que <strong className="text-gray-900">funcionan.</strong> 
            Cada elemento está diseñado científicamente para maximizar tus oportunidades.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-white hover:bg-gray-50 border-2 border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 rounded-3xl p-12 text-white relative overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-3xl"
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">
                Todo lo que necesitas para destacar
              </h3>
              
              <p className="text-blue-100 text-lg leading-relaxed">
                 <strong className="text-white">Ejemplo:</strong> Mientras otros envían CVs genéricos, tú tendrás una ventaja unfair. 
                Cada característica está diseñada para multiplicar tus resultados.
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-blue-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Link href="/get-started">
                  <Button
                    size="lg"
                    className="group bg-white text-blue-900 hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <Target className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Empezar gratis ahora
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
              >
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">X+</div>
                <div className="text-blue-200 text-sm">Usuarios activos</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
              >
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">X%</div>
                <div className="text-blue-200 text-sm">Más entrevistas</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
              >
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">&lt; 1min</div>
                <div className="text-blue-200 text-sm">Setup completo</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20"
              >
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">X%</div>
                <div className="text-blue-200 text-sm">Uptime garantizado</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}