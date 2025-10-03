"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";

const errorMapper = {
  "Invalid password": "Contraseña incorrecta",
  "User not found": "Usuario no encontrado",
  "Email not verified": "Correo electrónico no verificado",
  "Too many requests": "Demasiadas solicitudes, intenta más tarde",
  "Invalid email or password": "Correo electrónico o contraseña inválidos",
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      setError(null);
      // Replace with real authentication logic
      const response = await authClient.signIn.email({
        email,
        password
      })
      if (response.error) {
        const errorMessage = errorMapper[response.error.message] || response.error.message || "Error al iniciar sesión";
        setError(errorMessage);
        return;
      }
      setSuccess(true);
      // Redirect to dashboard or home page after successful login
      router.push('/cv');
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
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Inicia sesión
          </CardTitle>
          <CardDescription className="text-gray-500 text-sm">
            Accede a tu panel de control y gestiona tus datos de forma segura
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Correo
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 focus-visible:ring-orange-500"
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="text-red-500 text-sm ">
                  {error}
                </div>
              </div>
            )}
            
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <div className="text-green-500 text-sm">
                  ¡Has iniciado sesión correctamente! Redirigiendo...
                </div>
              </div>
            )}
            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <a
                onClick={()=> router.push('/forgot-password')}
                className="text-orange-600 hover:text-orange-700 font-medium hover:underline cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <a
                onClick={()=> router.push('/register')}
                className="text-orange-600 hover:text-orange-700 font-medium hover:underline cursor-pointer"
              >
                Crear cuenta
              </a>
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Iniciar sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
