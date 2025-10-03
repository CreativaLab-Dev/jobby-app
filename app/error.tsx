"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, Bug, ArrowLeft } from "lucide-react"

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])
  // TODO: Integrate with an error reporting service like Sentry or LogRocket
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Animated Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full mb-6 shadow-2xl"
              >
                <AlertTriangle className="w-16 h-16 text-white" />
              </motion.div>
              
              {/* Warning indicators */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">!</span>
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60"
              />
            </div>
          </motion.div>
          
          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
              ¡Oops! Algo salió mal
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Ha ocurrido un error inesperado. No te preocupes, nuestro equipo ha sido notificado.
            </p>
          </motion.div>
          
          {/* Error Details Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Bug className="w-6 h-6 mr-3 text-yellow-500" />
                  Detalles del Error
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-left">
                  <h4 className="font-semibold text-gray-700 mb-2">¿Qué puedes hacer?</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-600">Intenta recargar la página usando el botón "Intentar de nuevo"</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-600">Si el problema persiste, regresa al inicio y vuelve a intentar</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-600">Contacta a soporte si continúas experimentando problemas</p>
                    </div>
                  </div>
                </div>
                
                {/* Error details for development */}
                {process.env.NODE_ENV === "development" && (
                  <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
                    <h4 className="font-semibold text-gray-700 mb-2">Información técnica:</h4>
                    <p className="text-sm text-gray-600 font-mono break-all">{error.message}</p>
                    {error.digest && <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={reset}
                className="px-8 py-4 text-lg bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                </motion.div>
                Intentar de Nuevo
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="ml-2"
                >
                  🔄
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="px-8 py-4 text-lg border-2 bg-white/90 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 hover:border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Ir al Inicio
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="px-8 py-4 text-lg hover:bg-gray-100 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Regresar
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full blur-xl" />
          <div className="absolute top-1/3 right-5 w-16 h-16 bg-gradient-to-r from-yellow-300/10 to-red-300/10 rounded-full blur-lg" />
        </motion.div>
      </div>
    </div>
  )
}
