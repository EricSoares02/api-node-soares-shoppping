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
    comments,
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
        store: {
          create: {
            name: store.name,
            cnpj: store.cnpj,
            email: store.email,
            password: store.password,
            url_img: store.url_img,
            desc: store.desc,
          },
        },
        comments: {
          create: {
            authorId: comments?.authorId,
            title: comments.title 
          },
        },
      },
      include: {
        store: true,
        comments: true,
      },
    });
    return res.json(`created product:${data.name}`).status(201);
  } catch (error) {
    res.json({ message: "internal error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
};
