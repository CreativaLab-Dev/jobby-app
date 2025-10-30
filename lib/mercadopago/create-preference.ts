"use server"

import { prisma } from "@/lib/prisma";

import { Preference } from "mercadopago";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import { BASE_URL, mercadopago } from "@/lib/mercado-preference";
import { getCurrentUser } from "@/features/share/actions/get-current-user";


export const createPreference = async () => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'No se ha encontrado el usuario',
      }
    }

    // Verify if user have an active subscription
    const userSuscription = await prisma.userSubscription.findFirst({
      where: {
        userId: currentUser.id,
        expiresAt: {
          gt: new Date(),
        },
      },
    })
    if (userSuscription) {
      return {
        success: false,
        error: 'Ya tienes una suscripción activa',
      }
    }

    const basicSubscriptionPlan = await prisma.subscriptionPlan.findFirst({
      where: {
        id: 'd79cafea-beef-4037-a874-bf0e8e04d4e9',
      },
    })
    if (!basicSubscriptionPlan) {
      return {
        success: false,
        error: 'No se ha encontrado el plan de suscripción',
      }
    }

    const body: PreferenceCreateData = {
      body: {
        items: [
          {
            id: basicSubscriptionPlan.id,
            unit_price: 9.90,
            quantity: 1,
            title: basicSubscriptionPlan.name || 'sin-titulo',
            currency_id: 'PEN',
          },
        ],
        metadata: {
          id: basicSubscriptionPlan.id,
          userId: currentUser.id,
          type: 'basicSubscriptionPlan',
        },
        external_reference: basicSubscriptionPlan.id,
        redirect_urls: {
          success: `${BASE_URL}/cv?subscription=success`,
          failure: `${BASE_URL}/cv?subscription=failure`,
        }
      },
    }

    const preference = await new Preference(mercadopago).create(body)

    return {
      success: true,
      redirect: preference.init_point!
    }
  } catch (error) {
    console.error("[MERCADOPAGO][CREATE_PREFERENCE][ERROR]", error)
    return {
      success: false,
      error: 'Ha ocurrido un error al procesar tu solicitud',
      raw: error,
    }
  }
}