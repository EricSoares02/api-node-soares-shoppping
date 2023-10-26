import { Response } from "express";
import connect from "../../../database";
import { prisma } from "../prisma/prisma";
import { IUpdateProps } from "../../model/product/ParamsProduct";

export async function updateProductService(
  oldProductData: any,
  updateProduct: IUpdateProps,
  res: Response
) {
  switch (updateProduct.updateType) {
    case "updateOne":
      try {
        connect();
        //atualizando o produto pelo id
        await prisma.product.update({
          where: {
            id: updateProduct.id,
          },
          data: {
            name: updateProduct.data.name,
            category: updateProduct.data.category,
            desc: updateProduct.data.desc,
            price_in_cent: updateProduct.data.price_in_cent,
            url_img: updateProduct.data.url_img,
          },
        });
        return res
          .json({
            "old product": `${oldProductData}`,
            "new product": `${updateProduct.data}`,
          })
          .status(201);
      } catch (error) {
        res.json({ message: "internal error" }).status(500);
      } finally {
        await prisma.$disconnect();
      }

      break;
    case "updateOneCategory":
      try {
        connect();
        //atualizando uma categoria do banco
        await prisma.product.updateMany({
          where: {
            category: { contains: oldProductData.category },
          },
          data: { category: updateProduct.data.category },
        });
      } catch (error) {
        res.json({ message: "internal error" }).status(500);
      } finally {
        await prisma.$disconnect();
      }

      break;
    default:
      res.send("error: updateType must be updateManyCategory or updateOne ");
      break;
  }
}
