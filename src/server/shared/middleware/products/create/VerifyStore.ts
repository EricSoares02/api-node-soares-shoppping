import { Response } from "express";
import connect from "../../../../database";
import { prisma } from "../../../services/prisma/prisma";
import { createProductService } from "../../../services/produtos/createProduct";
import { IProduto } from "../../../model/product/Produto";

export async function VerifyStore(data: IProduto, res: Response) {
 let verify: boolean = false
  try {
    connect();
    await prisma.store.findFirst({
      where: { id: data.store },
    }).then((response)=> response ? verify = true : verify = false)
    res.send("passou para o service"+ verify); 
    if (verify) {
       createProductService(res, data)  
    } else {
      res.send(`this store cannot exist: ${data.store}`);
    }
  } catch (error) {
    res.json({ message: "internal verify error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
 
}
