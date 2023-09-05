import connect from "../../../database";
import { prisma } from "../prisma/prisma";

export const getAllProductsService = async () => {
    try {
      connect();
      const result = await prisma.product.findMany();
      return result;
    } catch (error) {
      console.log(`error:${error}`);
    } finally {
      await prisma.$disconnect();
    }
  };