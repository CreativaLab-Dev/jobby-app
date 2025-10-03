"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLoading from "@/components/auth/auth-loading";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const verifyAndLogin = async () => {
      const token = searchParams.get("token");
      const uuid = searchParams.get("id");
      
      if (!token || !uuid) {
        router.replace("/404");
        return;
      }
      
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ token, uuid }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (res.ok) {
        router.replace("/profile/password");
      } else {
        router.replace("/404");
      }
    };
    
    verifyAndLogin();
  }, [searchParams, router]);
  
  return <AuthLoading />
}