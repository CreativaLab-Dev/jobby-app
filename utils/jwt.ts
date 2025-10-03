import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface MagicTokenPayload {
  sub: string;
  email: string;
  exp: number;
}

export function verifyToken(token: string): string | null {
  try {
    const payload =  jwt.verify(token, JWT_SECRET) as MagicTokenPayload;
    return payload.email;
  } catch (error) {
    console.error("[ERROR_VERIFY_TOKEN]:", error);
    return null;
  }
}


export function generateToken(email: string): string {
  try {
    const payload: MagicTokenPayload = {
      sub: "magic-token",
      email,
      // Expiration time set to 1 month (60 minutes * 24 hours * 30 days)
      exp: Math.floor(Date.now() / 1000) + (60 * 24 * 30), // 30 days
    };
    
    return jwt.sign(payload, JWT_SECRET);
  } catch (error) {
    console.error("[ERROR_GENERATE_TOKEN]:", error);
    return null;
  }
}
