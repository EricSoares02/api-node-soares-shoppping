import { Request, Response } from "express";
import { z } from "zod";
import { ECategoryTypes, IProduto } from "../../shared/model/product/Produto";
import { CreateManyProductsMiddleware } from "../../shared/middleware/products/create/CreateManyProducts";


const ArrayProductSchema = z.array(z.object({
  name: z.string().min(3),
  url_img: z.string().array(),
  price_in_cent: z.number().positive(),
  desc: z.string().optional(),
  subCategory: z.string(),
  category: z.nativeEnum(ECategoryTypes),
  options: z.string().array().max(8, "8 é o número máximo de opções"),
}))



export const createMany = async (req: Request, res: Response) => {
  const P: Array<IProduto> = req.body.products;
  const storeId = req.params.storeId
  ArrayProductSchema.parse(P);


  CreateManyProductsMiddleware(P, res, storeId)

  
};
