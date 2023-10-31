import { Response } from "express";
import connect from "../../../database";
import { IComments } from "../../model/product/Produto";
import { prisma } from "../../services/prisma/prisma";
import { CreateCommentService } from "../../services/comment/create/createComment";

export async function VerifyProduct(comment:IComments, res:Response) {
    let verify: boolean = false
    try {
      connect();
      await prisma.product.findFirst({
        where: { id: comment.product_commentedId },
      }).then((response)=> response ? verify = true : verify = false)
      res.send("passou para service"+ verify); 
      if (verify) {
        CreateCommentService(comment, res)
      } else {
        res.send(`this user cannot exist: ${comment.authorId}`);
      }
    } catch (error) {
      res.json({ message: "internal verify error" }).status(500);
    } finally {
      await prisma.$disconnect();
    }
}