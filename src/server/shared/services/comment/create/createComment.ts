import { Response } from "express";
import connect from "../../../../database";
import { IComments } from "../../../model/product/Produto";
import { prisma } from "../../prisma/prisma";


export const CreateCommentService = async (data:IComments, res: Response) => {
    try {
        connect();
        await prisma.comments.create({
          data: data,
        });
        return res.json(`created comment:${data.title}`).status(201);
      } catch (error) {
        res.json({ message: "internal Prisma error" }).status(500);
      } finally {
        await prisma.$disconnect();
      }
}