import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma/prisma";
import connect from "../../database";

type JwtPayload = {
  id: string;
};

export async function Authorization(
  authorization: string,
  res: Response,
  next: NextFunction
) {
  if (!authorization) {
    throw res.status(401).json({ message: "unauthorized" });
  }

  const token = authorization.split(" ")[1];


    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;
   
  try {
    connect();
    const userExist = await prisma.user.findUnique({ where: { id: id } });

    if (!userExist) {
      throw res.json({ message: "unauthorized" });
    }

    next();
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
