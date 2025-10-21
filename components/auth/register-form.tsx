"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { newUserConfiguration } from "@/lib/shared/new-user-configuration";

const errorMapper: Record<string, string> = {
  "Email already exists": "El correo electrónico ya está en uso",
  "Invalid email": "Correo electrónico inválido",
  "Password too short": "La contraseña debe tener al menos 6 caracteres",
  "Passwords do not match": "Las contraseñas no coinciden",
  "Too many requests": "Demasiadas solicitudes, intenta más tarde",
  "User already exists": "El usuario ya existe",
};

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      setError(null);
      const response = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })
      if (response.error) {
        const errorMessage = errorMapper[response.error.message] || response.error.message || "Error al iniciar sesión";
        setError(errorMessage);
        return;
      }

      const userId = response.data.user?.id;
      if (!userId) {
        setError("Error al crear la cuenta");
        return;
      }

      // Create a basic subscription for the new user
      if (isPending) {
        return;
      }

      startTransition(async () => {
        const response = await newUserConfiguration(userId);
        if (!response) {
          console.error("Error in new user configuration for userId:", userId);
        }
      });

      setSuccess(true);
      router.push("/cv");
    } catch (error: any) {
      const errorMessage = errorMapper[error.message] || error.message || "Error al crear la cuenta";
      setError(errorMessage);
      return;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card className="shadow-xl border border-orange-100 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 mb-3">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Crear cuenta
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Únete ahora y comienza a mejorar tu CV con IA
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Nombre completo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-gray-300 focus-visible:ring-orange-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-gray-300 focus-visible:ring-orange-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-gray-300 focus-visible:ring-orange-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirmar contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-gray-300 focus-visible:ring-orange-500"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <div className="text-green-500 text-sm">
                  ¡Cuenta creada exitosamente! Redirigiendo...
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <a href="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                ¿Ya tienes cuenta? Inicia sesión
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting || success}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Registrarse"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
