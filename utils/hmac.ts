import crypto from "node:crypto";
import { timingSafeEqual } from "node:crypto";

const SECRET = process.env.TOKEN_SECRET!;
if (!SECRET) throw new Error("TOKEN_SECRET missing");

export function hmacSha256(data: string) {
  return crypto.createHmac("sha256", SECRET).update(data).digest("hex");
}

export function safeEq(a: string, b: string) {
  return a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
}