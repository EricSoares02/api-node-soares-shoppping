import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";
import { IProduto } from "../../model/product/Produto";

export const createProductService = async (res: Response, data: IProduto) => {
  const {
    category,
    name,
    options,
    price_in_cent,
    store,
    subCategory,
    url_img,
    desc,
    stars,
    review_numbers,
  } = data;

  try {
    connect();
    await prisma.product.create({
      data: {
        category: category,
        name: name,
        price_in_cent: price_in_cent,
        subCategory: subCategory,
        desc: desc,
        options: options,
        stars: stars,
        url_img: url_img,
        review_numbers: review_numbers,
        storeId: store,
        },
    });
    return res.json(`created product:${data.name}`).status(201);
  } catch (error) {
    res.json({ message: "internal Prisma error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
};
