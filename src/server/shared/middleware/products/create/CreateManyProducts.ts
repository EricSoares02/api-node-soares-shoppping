import { Response } from "express";
import { IProduto } from "../../../model/product/Produto";
import { CategoryMidlleware } from "./subCategoryValidation";
import connect from "../../../../database";
import { prisma } from "../../../services/prisma/prisma";
import { createProductService } from "../../../services/produtos/createProduct";
//import { createManyProductsService } from "../../../services/produtos/createManyProducts";

export const CreateManyProductsMiddleware = async (
  array: Array<IProduto>,
  res: Response,
  storeId: string
) => {



  array.map((product, index) => {
    const datavalidation = new CategoryMidlleware(
      product.category,
      product.subCategory,
      res
    );
    datavalidation.validationCategoryAndSubCategory();

    async function ITA() {
      try {
        connect();
        const response = await prisma.store.findUnique({
          where: { id: storeId },
        });

        if (response) {
          createProductService(res, product, storeId)
          console.log(index)
          //throw res.send(`o item com o index${index}, tentou cadastrar-se em uma loja inexistente`)
        } 
      } catch (error) {
        res.json({ message: "internal verify error" }).status(500);
      } finally {
        await prisma.$disconnect();
      }
    }
    ITA();
  });



console.log('passou essa dgc')
   //createManyProductsService(array, res);
  
};
