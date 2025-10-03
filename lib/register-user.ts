"use server"

import {prisma} from "@/lib/prisma";
import {auth} from "@/lib/auth";

type RegisterUserData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  file?: File
}

export const registerUserWithCv = async (body: RegisterUserData) => {
  try {
    
    if (body.password !== body.confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match. Please try again."
      }
    }
    
    if (body.password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters long."
      }
    }
    
    if (body.file && body.file.size > 5 * 1024 * 1024) {
      // 5MB limit
      return {
        success: false,
        message: "File size exceeds 5MB limit. Please upload a smaller file."
      }
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    })
    if (existingUser) {
      return {
        success: false,
        message: "Email already registered. Please use a different email."
      }
    }
    
    await auth.api.signUpEmail({
      body: {
        email: body.email,
        password: body.confirmPassword,
        name: body.name.trim(),
      },
    });
    
    const user = await prisma.user.findUnique({
      where: { email: body.email }
    })
    if (!user) {
      return {
        success: false,
        message: "User not found after signup. Please try again."
      }
    }
    
    const candidate = await prisma.candidate.create({
      data: {
        userId: user.id,
        usage: {
          create: {
            createCVWithAI: 0,
            analyzeCV: 0,
          }
        }
      },
    })
    
    if (!candidate) {
      return {
        success: false,
        message: "Candidate creation failed. Please try again."
      }
    }
    
    // Validate if we need to do that
    // if (body.file) {
    //   await createAnalysisOfCv()
    // }
    
    await auth.api.signInEmail({
      body: {
        email: body.email,
        password: body.confirmPassword,
      },
      asResponse: true
    });
    
    return {
      success: true,
      message: "User registered successfully. You can now log in."
    }
    
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "Error registering user. Please try again later."
    }
  }
}