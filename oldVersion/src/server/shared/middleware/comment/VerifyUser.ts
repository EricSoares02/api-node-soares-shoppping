import { Response } from "express";
import connect from "../../../database";
import { IComments, ICommentsParams } from "../../model/product/Produto";
import { prisma } from "../../services/prisma/prisma";
import { VerifyProduct } from "./VerifyProduct";


export async function VerifyUser(commentquery:ICommentsParams,comment:IComments, res:Response){

    let verify: boolean = false
    try {
      connect();
      await prisma.user.findFirst({
        where: { id: commentquery.user },
      }).then((response)=> response ? verify = true : verify = false)
      res.send("passou para o verify product"+ verify); 
      if (verify) {
        VerifyProduct(commentquery, comment, res)
      } else {
        res.send(`this user cannot exist: ${commentquery.user}`);
      }
    } catch (error) {
      res.json({ message: "internal verify error" }).status(500);
    } finally {
      await prisma.$disconnect();
    }

}