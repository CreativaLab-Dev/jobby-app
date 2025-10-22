"use client"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {User, LogOut, Settings, BookA, Loader2, Home} from "lucide-react"
import { useRouter } from "next/navigation"
import {Separator} from "@/components/ui/separator";
import {authClient} from "@/lib/auth-client";
import {useState} from "react";
import {cn} from "@/lib/utils";

interface ProfileButtonProps {
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
}

export function ProfileButton({ user }: ProfileButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await authClient.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-full p-0 w-10 h-10 cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.image || "/images/user-avatar.png"} alt="User avatar" />
            <AvatarFallback>
              <User className="w-5 h-5 text-gray-500" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="border-gray-200 w-48 p-2 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-2">
          {/* Info about the user */}
          <div className="flex items-center gap-2 p-2 border-b border-gray-200">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.image || "/images/user-avatar.png"} alt="User avatar" />
              <AvatarFallback>
                <User className="w-5 h-5 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium text-gray-800">{user.name || "No se"}</div>
          </div>
          <button
            onClick={() => router.push("/cv")}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 transition cursor-pointer"
            >
            <Home className="w-4 h-4 text-gray-500" />
            Inicio
          </button>
          <button
            onClick={() => router.push("/settings")}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            Configuración
          </button>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className={cn("flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 transition cursor-pointer",
              isLoading ? "justify-center" : "hover:text-red-500")}
            
          >
            { isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-red-500" />
            ) : (
              <>
                <LogOut className="w-4 h-4 text-red-500" />
                Cerrar sesión
              </>
            )}
          </button>
          <Separator className="bg-gray-200 my-2" />
          <button
            onClick={() => router.push("/complaints")}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          >
            <BookA className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">Reclamaciones</span>
          </button>
          <Separator className="bg-gray-200 my-2" />
        {/*  Version App */}
          <div className="text-xs text-gray-500 text-center">
            Versión 1.0.0
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
