import {prisma} from "@/lib/prisma";

export const getPaymentById = async (id: string) => {
  try{
    return await prisma.paymentToken.findFirst({
      where: {
        id,
      }
    })
    
  } catch (error) {
    console.error('Error creating user token:', error);
    return null;
  }
}