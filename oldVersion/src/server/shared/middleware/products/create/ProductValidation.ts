import { z } from "zod";
import { ECategoryTypes, IProduto } from "../../../model/product/Produto";



  
  const ProductSchema = z.object({
    name: z.string().min(3),
    url_img: z.string().array(),
    price_in_cent: z.number().positive(),
    desc: z.string().optional(),
    category: z.nativeEnum(ECategoryTypes),
    options: z.string().array().max(8, "8 é o número máximo de opções"),
  });

export function ProductValidation(data:IProduto){

    //validando product
    ProductSchema.parse(data);
   
}