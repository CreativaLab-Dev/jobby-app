"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { ForgotPasswordForm } from "@/components/auth/forgo-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <AnimatedBackground />
      <div className="relative z-10">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
