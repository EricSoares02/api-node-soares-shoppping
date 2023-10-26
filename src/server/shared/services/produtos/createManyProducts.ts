import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";
import { IProduto } from "../../model/product/Produto";

export const createManyProductsService = async (
  res: Response,
  P: Array<IProduto>
) => {
  try {
    connect();
    await prisma.product.createMany({
      data: P,
    });
    return res.json(`created products sucessful`).status(201);
  } catch (error) {
    res.json({ message: "internal error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
};
