import connect from "../../../database";
import { prisma } from "../prisma/prisma";

export const getProductByIdService = async (id:string | undefined) => {
  try {
    connect();
    const product = await prisma.product.findUnique({ where: {id:id} });
    const productStore = await prisma.product.findUnique({ where: {id:id} }).store();
    return {product, productStore};
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
