import { Response } from "express";
import connect from "../../../database";
import { prisma } from "../prisma/prisma";

export const deleteProductsService = async (id: string, res: Response) => {
  try {
    connect();
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return res.json({ message: `product with id: ${id} deleted` }).status(200);
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
