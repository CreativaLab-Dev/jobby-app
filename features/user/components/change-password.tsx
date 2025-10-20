"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react";
import { updatePassword } from "@/lib/shared/update-password";

interface ChangePasswordProps {
  user: {
    id: string
    email: string
    name?: string
    image?: string
  }
}

export default function ChangePassword({ user }: ChangePasswordProps) {
  const router = useRouter()
  const [email, setEmail] = useState(user.email || "")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleChangePassword = async () => {
    setError("")
    setSuccess("")
    if (!email || !newPassword || !confirmPassword) {
      setError("Todos los campos son requeridos.")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }
    setLoading(true)
    onSubmit()
  }

  const onSubmit = () => {
    if (isPending) return
    startTransition(() => {
      updatePassword(newPassword).then((result) => {
        if (result?.success) {
          setSuccess("Contraseña actualizada exitosamente ✅")
          setEmail("")
          setNewPassword("")
          setConfirmPassword("")
          setLoading(false)
          router.push('/cv')
        }
        if (!result?.success) {
          setError(result.message || "Hubo un error al actualizar la contraseña.")
          setLoading(false)
        }
      })
    })
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Nueva Contraseña
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              Actualiza tu contraseña para mantener tu cuenta segura 🔒
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Correo</label>
              <Input
                type="text"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="user@gmail.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Nueva Contraseña</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Confirmar Nueva Contraseña</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <Button
              className="w-full mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleChangePassword}
              disabled={loading}
            >
              {loading ? "Actualizando..." : "Actualizar Contraseña"}
            </Button>

            <Button
              variant="ghost"
              className="w-full text-purple-600 hover:text-purple-800 mt-2"
              onClick={() => router.push("/dashboard")}
            >
              Cancelar
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
