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
    // store: IStore;
    options: z.string().array().max(8, "8 é o número máximo de opções"),
    //comments: z.string().array().optional(),
    stars: z.number().lte(5, "as estrelas não podem ser maior que 5 por user").nonnegative("as estrelas devem ser um número positivo ou 0").optional(),
    review_numbers: z.number().optional(),
  });

export function ProductValidation(data:IProduto){

    //validando product
    ProductSchema.parse(data);
   
}