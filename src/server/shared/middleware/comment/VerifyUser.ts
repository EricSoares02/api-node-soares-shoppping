import { Response } from "express";
import connect from "../../../database";
import { IComments } from "../../model/product/Produto";
import { prisma } from "../../services/prisma/prisma";
import { VerifyProduct } from "./VerifyProduct";


export async function VerifyUser(comment:IComments, res:Response){

    let verify: boolean = false
    try {
      connect();
      await prisma.user.findFirst({
        where: { id: comment.authorId },
      }).then((response)=> response ? verify = true : verify = false)
      res.send("passou para o verify product"+ verify); 
      if (verify) {
        VerifyProduct(comment, res)
      } else {
        res.send(`this user cannot exist: ${comment.authorId}`);
      }
    } catch (error) {
      res.json({ message: "internal verify error" }).status(500);
    } finally {
      await prisma.$disconnect();
    }

}