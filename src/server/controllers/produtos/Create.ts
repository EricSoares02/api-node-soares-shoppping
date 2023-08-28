import { Request, Response } from "express";
import { IProduto } from "../../shared/model/Produto";
import { z } from "zod";
import { validation } from "../../shared/middleware";

const schemap = z.object({
  id: z.string(),
  name: z.string().min(3),
  url_img: z.string(),
  price_in_cent: z.number(),
  desc: z.string().optional(),
  category: z.string(),
});


export const createBodyValidator = validation("body", schemap);

// eslint-disable-next-line @typescript-eslint/ban-types
export const create = async (req: Request<{}, {}, IProduto>, res: Response) => {
  console.log(req.body.name);

  res.send("nada maninho");
};

