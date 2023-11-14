import { Response } from "express";
import connect from "../../../../database";
import { prisma } from "../../../services/prisma/prisma";
import { createProductService } from "../../../services/produtos/createProduct";
import { IProduto } from "../../../model/product/Produto";


export async function VerifyStore(data: IProduto, res: Response, storeId: string) {
 let verify: boolean = false
 let ide:string = ''
 
  try {
    connect();
    await prisma.store.findUnique({
      where: { id: storeId },
    }).then((response)=> response ? ide = response.id : '').then((response)=> response ? verify = true : verify = false)
    if (verify) {
       createProductService(res, data, ide )  
    } else {
      res.send(`this store cannot exist: ${data.storeId}`);
    }
  } catch (error) {
    res.json({ message: "internal verify error", error }).status(500);
  } finally {
    await prisma.$disconnect();
  }
 
}
