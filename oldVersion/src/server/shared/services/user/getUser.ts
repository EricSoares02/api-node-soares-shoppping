import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";

export const getUserService = async ( id: string, res: Response) => {
  try {
    connect();
   const user = await prisma.user.findUnique({
      where:{id:id},
    });
    return res.status(201).json({user:user});
  } catch (error) {
    res.status(500).json({ message: "internal Prisma error" });
  } finally {
    await prisma.$disconnect();
  }
};
