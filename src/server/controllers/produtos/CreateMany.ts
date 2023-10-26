import { Request, Response } from "express";
import { z } from "zod";
import { validation } from "../../shared/middleware";
import { createManyProductsService } from "../../shared/services/produtos/createManyProducts";
import { IProduto } from "../../shared/model/product/Produto";

const ProductSchema = z.object({
  name: z.string().min(3),
  url_img: z.string(),
  price_in_cent: z.number(),
  desc: z.string().optional(),
  category: z.string(),
});

export const ArrayProductSchema = z.array(ProductSchema);

export const createMany = async (req: Request, res: Response) => {
  const P: Array<IProduto> = req.body.products;

  const createManyProductsValidator = validation(
    "body",
    ArrayProductSchema.safeParse(P)
  );

  await createManyProductsValidator;

  try {
    createManyProductsService(res, P);
  } catch (error) {
    console.log(error);
  }
};
