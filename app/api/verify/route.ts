import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/lib/auth";
import {validateTokenAndEmail} from "@/utils/validate-token-and-email";
import {getPaymentById} from "@/lib/get-payment-by-id";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { token, uuid } = await req.json();
  
  if (!token || !uuid) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }
  
  const paymentToken = await getPaymentById(uuid);
  if (!paymentToken) {
    return NextResponse.json({ error: "Invalid payment" }, { status: 404 });
  }
  
  const email = await validateTokenAndEmail(token);
  if (!email) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  const PASSWORD_TMP = "ASDJKBAasd@asdni123";
  if (!existingUser) {
    await auth.api.signUpEmail({
      body: {
        email,
        password: PASSWORD_TMP,
        name: email,
      },
    });
    
    const currentUser = await prisma.user.findUnique({ where: { email } });
    if (!currentUser) {
      return NextResponse.json({ error: "User not found after signup" }, { status: 500 });
    }
    
    const candidate = await prisma.candidate.create({
      data: {
        userId: currentUser.id,
        usage: {
          create: {
            createCVWithAI: 0,
            analyzeCV: 0,
          }
        }
      },
    })
    
    if (!candidate) {
      return NextResponse.json({ error: "Candidate creation failed" }, { status: 500 });
    }
  }

  return await auth.api.signInEmail({
    body: {
      email,
      password: PASSWORD_TMP,
    },
    asResponse: true
  });
}
