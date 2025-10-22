"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  HelpCircle, 
  Rocket, 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle,
  MessageSquare,
  Users
} from "lucide-react"

const faqs = [
  {
    question: "¿Realmente funciona con cualquier tipo de trabajo?",
    answer: "Absolutamente. Nuestro sistema analiza más de 50 industrias diferentes, desde tecnología hasta finanzas, marketing, salud, educación y más. La IA se adapta automáticamente a tu sector y optimiza tu CV según las mejores prácticas de tu industria específica.",
    icon: Rocket,
    category: "Funcionalidad"
  },
  {
    question: "¿Qué hace que sea mejor que otros generadores de CV?",
    answer: "Mientras otros crean plantillas genéricas, nosotros usamos IA que analiza millones de CVs exitosos y patrones de contratación. Cada palabra está optimizada para sistemas ATS y recruiters humanos. No es solo diseño, es ciencia aplicada al reclutamiento.",
    icon: Zap,
    category: "Diferenciación"
  },
  {
    question: "¿Cuánto tiempo toma ver resultados reales?",
    answer: "El 87% de nuestros usuarios reporta mejores respuestas en las primeras 2 semanas. Algunos ven resultados en días. El cambio es inmediato porque tu CV pasa de ser genérico a estar científicamente optimizado para lo que los recruiters buscan.",
    icon: Clock,
    category: "Resultados"
  },
  {
    question: "¿Es seguro subir mi información personal?",
    answer: "Completamente. Usamos encriptación de nivel bancario (SSL 256-bit) y nunca compartimos tu información con terceros. Tu data se almacena en servidores seguros y puedes eliminar tu cuenta en cualquier momento. Certificados ISO 27001 para protección de datos.",
    icon: Shield,
    category: "Seguridad"
  },
  {
    question: "¿Qué pasa si no veo mejores resultados?",
    answer: "Ofrecemos garantía de 30 días. Si no ves una mejora significativa en respuestas o calidad de oportunidades, te devolvemos tu dinero sin preguntas. Estamos tan seguros de nuestro sistema que solo el 2% solicita reembolso.",
    icon: CheckCircle,
    category: "Garantía"
  },
  {
    question: "¿Puedo actualizar mi CV cuando cambie de trabajo?",
    answer: "¡Por supuesto! Tu suscripción incluye actualizaciones ilimitadas. Cada vez que agregues experiencia, cambies de rol o quieras aplicar a un sector diferente, puedes regenerar tu CV optimizado. Es como tener un career coach 24/7.",
    icon: Users,
    category: "Actualizaciones"
  }
]

const stats = [
  { number: "50,000+", label: "Usuarios activos", icon: Users },
  { number: "4.9/5", label: "Rating promedio", icon: CheckCircle },
  { number: "< 24h", label: "Soporte respuesta", icon: MessageSquare },
  { number: "99.9%", label: "Uptime garantizado", icon: Shield }
]

export function FaqSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="font-medium">Preguntas frecuentes</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
            Resolvemos tus dudas
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estas son las preguntas más comunes. Si necesitas algo más específico, 
            <strong className="text-gray-900"> nuestro equipo responde en menos de 24 horas.</strong>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem 
                    value={`item-${index}`}
                    className="border-0 bg-gray-50 hover:bg-gray-100 rounded-2xl px-6 py-2 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left hover:no-underline group">
                      <div className="flex items-center gap-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-all">
                          <faq.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed pl-16 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>

          {/* Stats & Contact Sidebar */}
          <div className="space-y-6">
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Números que hablan</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="inline-flex p-3 bg-white rounded-xl shadow-sm mb-2">
                          <stat.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-xl text-white">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  
                  <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda personalizada?</h3>
                  
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Nuestro equipo de expertos está disponible para ayudarte con cualquier duda específica sobre tu carrera.
                  </p>

                  <div className="space-y-3 text-sm text-blue-100">
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Respuesta en menos de 24h</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Soporte en español</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>100% gratuito</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}