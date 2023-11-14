import { Response } from "express";
import { IUpdateProps } from "../../../model/product/ParamsProduct";
import { prisma } from "../../../services/prisma/prisma";
import { updateProductService } from "../../../services/produtos/updateProduct";
import { z } from "zod";

// enum para tipo de atuaização. As mesmas se restringem à estes tipos, por isso é usado enum.
enum EUpdateType {
  updateOne = "updateOne",
  updateOneCategory = "updateOneCategory",
}
// schema de validação do tipo de atuaização
const updateTypeschema = z.nativeEnum(EUpdateType);
// schema de validação do id
const idSchema = z.string().length(24, "Must be exactly 24 characters long");
// schema de validação para a antiga categoria
const OldCategory = z.string().toLowerCase();
// schema de validação do produto passado
const productSchema = z.object({
  name: z.string(),
  url_img: z.string().array(),
  price_in_cent: z.number().positive(),
  category: z.string().toLowerCase(),
  desc: z.string().optional(),
  subCategory: z.string(),
  options: z.string().array()
});
// schema validação para produto onde category é obrigatório.
const PartialProduct = productSchema.partial({
  name: true,
  price_in_cent: true,
  url_img: true,
  category: true,
  subCategory: true,
  options: true

});
// schema validação para onde os elemento obrigatórios podem vir nulos .
const PartialProductCategory = productSchema.partial({
  name: true,
  price_in_cent: true,
  url_img: true,
});
// middleware com funções de verificação e regras de negócio
export async function UpdateMiddleWare(value: IUpdateProps, res: Response) {
  //recebendo os dados por props
  const { id, data, updateType } = value;
  //validando o tipo de atualização (updateType)
  updateTypeschema.parse(updateType);
  // pegando os dados do antigo produto para apresentar
  const oldProduct = await prisma.product.findUnique({
    where: { id: id },
  });

  // verificando se o antigo produto é diferente de null ou undefined
  if (oldProduct != null && oldProduct != undefined) {
    switch (updateType) {
      case "updateOne":
        // validando o id passado por props
        idSchema.parse(id);
        //validação do antingo produto
        productSchema.parse(oldProduct);
        //validação do novo produto
        PartialProduct.parse(data);
        //verificação de propriedades vazias que continuarão iguais as antigas
        if (data.category === "") {
          data.category = oldProduct.category;
        }
        if (data.name === "") {
          data.name = oldProduct.name;
        }
        if (data.price_in_cent === 1) {
          data.price_in_cent = oldProduct.price_in_cent;
        }
        if (data.desc === "") {
          data.desc =
            "esta descrição é meramente ilustrativa, nada escrito aqui deve ser considerado. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo reprehenderit sequi aspernatur laboriosam eligendi asperiores a dignissimos iste, quasi nisi. Impedit iusto, velit amet saepe odit sint eveniet laboriosam incidunt!Lorem ipsum dolor sit amet consectetur adipisicing elit";
        }
        if (data.url_img?.length===0) {
          data.url_img = oldProduct.url_img
        }
        if(data.subCategory===''){
          data.subCategory=oldProduct.subCategory
        }
        if(data.options?.length===0){
          data.options=oldProduct.options
        }
        value.data = data;
        console.log(value.data);
        updateProductService(oldProduct, value, res);

        break;
      // atualizar o nome de uma categoria inteira
      case "updateOneCategory":
        //validação de categoria. verificando se a string categoria é válida
        OldCategory.parse(oldProduct.category);
        //validação de produto. verificando se o valor de categoria existe e é válido
        PartialProductCategory.parse(data);
        //chamando product update service
        updateProductService(oldProduct, value, res);
        break;
      default:
        console.log("algo deu errado");
        break;
    }
  }
}
