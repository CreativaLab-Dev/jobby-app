"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import {Plus} from "lucide-react";
import {registerUserWithCv} from "@/lib/register-user";

interface RegisterModalProps {
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  file?: File
}

export function RegisterModal({ children, isOpen, onOpenChange, file }: RegisterModalProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPending, startTransition] = useTransition()
  
  const isFormValid = name && email && password && confirmPassword &&
    password === confirmPassword && password.length >= 8
  
  const handleRegister = () => {
    if (!isFormValid) {
      setError("Completa todos los campos correctamente.")
      return
    }
    setError("")
    setIsSubmitting(true)
    
    startTransition(async () => {
      try {
        const response = await registerUserWithCv(
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            confirmPassword: confirmPassword,
            file,
          }
        )
        if (response.success) {
          router.push("/cv/upload")
        } else {
          setError(response.message || "Error al registrar. Intenta de nuevo.")
        }
      } catch (err: any) {
        console.error(err)
        setError("Error al registrar. Intenta de nuevo.")
      } finally {
        setIsSubmitting(false)
      }
    })
  }
  
  const handleCancel = () => {
    setError("")
    onOpenChange(false)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            🖋️ Registro de Usuario
          </DialogTitle>
          <DialogDescription>
            Crea tu cuenta para acceder a todas las funcionalidades
          </DialogDescription>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="mt-1"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Correo Electrónico</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirmar Contraseña
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className="mt-1"
                />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardContent>
          </Card>
        </motion.div>
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting || isPending} className="cursor-pointer">
            Cancelar
          </Button>
          <Button
            onClick={handleRegister}
            disabled={!isFormValid || isSubmitting || isPending}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 cursor-pointer"
          >
            {isSubmitting || isPending ? (
              <span className="inline-flex items-center">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Registrando...
              </span>
            ) : (
              <span className="inline-flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Registrarse
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}