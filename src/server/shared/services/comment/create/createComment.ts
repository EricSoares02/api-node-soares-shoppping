import { Response } from "express";
import connect from "../../../../database";
import { IComments, ICommentsParams } from "../../../model/product/Produto";
import { prisma } from "../../prisma/prisma";


export const CreateCommentService = async (commentquery:ICommentsParams,comment:IComments, res: Response) => {
    try {
        connect();
        await prisma.comments.create({
          data: {title: comment.title,
          authorId: commentquery.user,
        product_commentedId: commentquery.product,
      stars: comment.stars},
        });
        return res.json(`created comment:${comment.title}`).status(201);
      } catch (error) {
        res.json({ message: "internal Prisma error" }).status(500);
      } finally {
        await prisma.$disconnect();
      }
}