"use client";

import {AnimatedBackground} from "@/components/animated-background";
import {RegisterForm} from "@/components/auth/register-form";

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <AnimatedBackground />
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
