import connect from "../../../database";
import { prisma } from "../prisma/prisma";

export const getProductByIdService = async (id:string | undefined) => {
  try {
    connect();
    const result = await prisma.product.findUnique({ where: {id:id} });
    return result;
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
