import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";

export const createProductService = async (
  res: Response,
  name: string,
  url_img: string,
  price_in_cent: number,
  category: string,
  desc?: string
) => {
  try {
    connect();
    await prisma.product.create({
      data: {
        name: name,
        url_img: url_img,
        price_in_cent: price_in_cent,
        desc: desc,
        category: category,
      },
    });
    return res.json(`created product:${name}`).status(201);
  } catch (error) {
    res.json({ message: "internal error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
};
