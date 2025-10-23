import { prisma } from "@/lib/prisma"
import { mercadopago } from "@/lib/mercado-preference"
import { Payment } from "mercadopago"
import { NextResponse } from "next/server"

type typePayment = "basicSubscriptionPlan"

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json()

    const { id } = body.data
    if (!id) {
      return new NextResponse("Id is required", { status: 400 });
    }

    const payment = await new Payment(mercadopago).get({ id: body.data.id });
    if (!payment) {
      return new NextResponse("Payment not found", { status: 404 });
    }

    if (payment.status !== "approved") {
      return new NextResponse(null, { status: 200 });
    }

    const {
      id: basicSubscriptionPlanId,
      user_id: userId,
      type,
    } = payment.metadata

    const typePayment = type as typePayment

    if (!userId) {
      return new NextResponse("userId is required", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (typePayment === 'basicSubscriptionPlan') {


      const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
        where: {
          id: basicSubscriptionPlanId
        }
      })

      if (!subscriptionPlan) {
        return new NextResponse("Subscription plan not found", { status: 404 });
      }

      const expiresAt = new Date()
      expiresAt.setMonth(expiresAt.getMonth() + 3)
      const newUserSubscription = await prisma.userSubscription.create({
        data: {
          userId,
          planId: subscriptionPlan.id,
          expiresAt,
        }
      })
      if (!newUserSubscription) {
        return new NextResponse("Failed to create user subscription", { status: 500 });
      }

      return new NextResponse(null, { status: 200 });
    }

    return new NextResponse("Invalid type", { status: 400 });

  } catch (error) {
    console.error("[MERCADOPAGO][CONFIRM_PAYMENT][ERROR]", error)
    return new NextResponse("Internal server error", { status: 500 });
  }

}