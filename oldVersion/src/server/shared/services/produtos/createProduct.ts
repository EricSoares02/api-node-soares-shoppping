import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";
import { IProduto } from "../../model/product/Produto";

export const createProductService = async (res: Response, data: IProduto, id:string) => {
  const {
    category,
    name,
    options,
    price_in_cent,
    subCategory,
    url_img,
    desc,

  } = data;

  try {
    connect();
     await prisma.store.update({
      where: {
        id: id
      }, data : {
          products: {
             create:{
              category: category,
              name: name,
              price_in_cent: price_in_cent,
              subCategory: subCategory,
              desc: desc,
              options: options,
              url_img: url_img,
             }
          }
      }
     })
    return res.json(`created product:${data.name}`).status(201);
  } catch (error) {
    res.json({ message: "internal Prisma error", error }).status(500);
  } finally {
    await prisma.$disconnect();
  }
};
