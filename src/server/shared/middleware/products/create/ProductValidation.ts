import { z } from "zod";
import { IProduto } from "../../../model/product/Produto";


enum ECategoryTypes {
    esporte = "esporte",
    informatica = "informatica",
    celular = "celular",
    bebida = "bebida",
    eletrodomestico = "eletrodomestico",
    ferramenta = "ferramenta",
    brinquedo = "brinquedo",
    moda = "moda",
    automovel = "automovel",
  }
  
  const ProductSchema = z.object({
    name: z.string().min(3),
    url_img: z.string().array(),
    price_in_cent: z.number().positive(),
    desc: z.string().optional(),
    category: z.nativeEnum(ECategoryTypes),
    options: z.string().array().max(8, "8 é o número máximo de opções"),
    review_numbers: z.number().optional(),
  });

export function ProductValidation(data:IProduto){

    //validando product
    ProductSchema.parse(data);
   
}