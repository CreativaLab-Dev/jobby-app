"use client"

import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function GlobalError({
                                      error,
                                      reset,
                                    }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
    <body>
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Critical Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
              className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-6 shadow-2xl"
            >
              <AlertTriangle className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>
          
          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Error Crítico
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página.
            </p>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={reset}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Recargar Aplicación
            </button>
            
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir al Inicio
            </button>
          </motion.div>
          
          {/* Error details for development */}
          {process.env.NODE_ENV === "development" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-4 bg-gray-100 rounded-lg text-left"
            >
              <h4 className="font-semibold text-gray-700 mb-2">Información técnica:</h4>
              <p className="text-sm text-gray-600 font-mono break-all">{error.message}</p>
              {error.digest && <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
    </body>
    </html>
  )
}
