import {verifyToken} from "@/utils/jwt";

export const validateTokenAndEmail = async (token: string) => {
  try {
    const email = verifyToken(token);
    if (!email) {
      return null;
    }
    
    // Here you can add additional checks, like verifying the email format or checking against a database
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.error("Invalid email format:", email);
      return null;
    }
    
    return email;
  } catch (error) {
    console.error("Token validation failed:", error);
    return null;
  }
}