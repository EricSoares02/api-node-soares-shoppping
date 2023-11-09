import { Response } from "express";
import connect from "../../../database";
import { IComments, ICommentsParams } from "../../model/product/Produto";
import { prisma } from "../../services/prisma/prisma";
import { CreateCommentService } from "../../services/comment/create/createComment";

export async function VerifyProduct(commentquery:ICommentsParams,comment:IComments, res:Response) {
    let verify: boolean = false
    try {
      connect();
      await prisma.product.findFirst({
        where: { id: commentquery.product },
      }).then((response)=> response ? verify = true : verify = false)
      res.send("passou para service"+ verify); 
      if (verify) {
        CreateCommentService(commentquery,comment, res)
      } else {
        res.send(`this product cannot exist: ${commentquery.product}`);
      }
    } catch (error) {
      res.json({ message: "internal verify error" }).status(500);
    } finally {
      await prisma.$disconnect();
    }
}