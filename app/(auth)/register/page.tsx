"use client";

import { RegisterForm } from "@/components/auth/register-form";

export default function LoginPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
