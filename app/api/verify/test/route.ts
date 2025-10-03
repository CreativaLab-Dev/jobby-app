import {generateToken} from "@/utils/jwt";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
    }
    
    const token = generateToken(email);
    
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[ERROR_CREATE_TOKEN]:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
