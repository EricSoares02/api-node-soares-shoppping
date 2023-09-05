import { Request, Response } from "express";
import { IProduto } from "../../shared/model/Produto";
import { z } from "zod";
import { validation } from "../../shared/middleware";
import { createProductService } from "../../shared/services/produtos/createProduct";

const schemap = z.object({
  name: z.string().min(3),
  url_img: z.string(),
  price_in_cent: z.number(),
  desc: z.string().optional(),
  category: z.string(),
});

export const createProductValidator = validation("body", schemap);

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async (req: Request<{}, {}, IProduto>, res: Response) => {
  const P = {
    name: req.body.name,
    url_img: req.body.url_img,
    price_in_cent: req.body.price_in_cent,
    category: req.body.category,
    desc: req.body.desc,
  };
  try {
    createProductService(
      res,
      P.name,
      P.url_img,
      P.price_in_cent,
      P.category,
      P.desc
    );
  } catch (error) {
    console.log(error);
  }
};
