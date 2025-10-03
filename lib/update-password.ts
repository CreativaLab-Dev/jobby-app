"use server"

import {auth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {getCandidate} from "@/features/share/actions/get-candidate";

export const updatePassword = async (password: string) => {
  try {
    const candidate = await getCandidate()
    if (!candidate) {
      console.log("[ERROR_UPDATE_PASSWORD] Candidate not found");
      return
    }
    
    const user = await prisma.user.findUnique({
      where: { id: candidate.user.id },
    })
    if (!user) {
      console.log("[ERROR_UPDATE_PASSWORD] User not found");
      return;
    }
    
    await auth.api.changePassword({
      body: {
        currentPassword: "ASDJKBAasd@asdni123",
        newPassword: password
      }
    });
    
    await auth.api.signInEmail({
      body: {
        email: user.email,
        password: password,
      },
      asResponse: true
    });
    
    return {
      success: true,
      message: "Contraseña actualizada exitosamente ✅",
    }
    
  } catch (error) {
    console.log("[ERROR_UPDATE_PASSWORD]", error);
    return {
      success: false,
      message: "Hubo un error al actualizar la contraseña.",
    }
  }
}