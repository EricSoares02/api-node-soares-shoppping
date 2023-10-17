import { Response } from "express";
import connect from "../../../database";
import { prisma } from "../prisma/prisma";
import { IProdutoUpdateProps } from "../../model/ParamsProduct";

export async function updateProductService(
  updateType: string,
  updateProduct: IProdutoUpdateProps,
  res: Response
) {
  switch (updateType) {
    case "updateOne":
      try {
        connect();
        // pegando os dados do antigo produto para apresentar 
        const oldProductData = await prisma.product.findUnique({
          where: { id: updateProduct.id },
        });
        //atualizando o produto
        await prisma.product.update({
          where: {
            id: updateProduct.id,
          },
          data: updateProduct.data,
        });
        return res
          .json({
            "update product": `${oldProductData}`,
            "new product": `${updateProduct.data}`,
          })
          .status(201);
      } catch (error) {
        res.json({ message: "internal error" }).status(500);
      } finally {
        await prisma.$disconnect();
      }

      break;
    case "updateManyCategory":
      try {
        connect();
        await prisma.product.updateMany({
          where: {
             category:  {contains: updateProduct.oldCategory }
          },
          data: {category: updateProduct.data.category},
        });
      } catch (error) {
        res.json({ message: "internal error" }).status(500);
      } finally {
        await prisma.$disconnect();
      }

      break;
    default:
        res.send("error: updateType must be updateManyCategory or updateOne ")
      break;
  }
}
