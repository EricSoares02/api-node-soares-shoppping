import connect from "../../../database";
import { prisma } from "../prisma/prisma";

export const getProductByIdService = async (id:string | undefined) => {
  try {
    connect();
    const product = await prisma.product.findUnique({ where: {id:id} });
    const productStore = await prisma.product.findUnique({ where: {id:id} }).store();
    const productComments = await prisma.comments.findMany({where: {product_commentedId: id }});
    const T = await prisma.user.findMany({where:{comments:{some:{product_commentedId:id}}}})
    return {product, productStore, productComments, T};
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    await prisma.$disconnect();
  }
};
