import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";
import { IUser } from "../../model/user/User";

export const createUserService = async (
  res: Response,
  data:IUser
) => {
  try {
    connect();
    await prisma.user.create({
      data: data,
    });
    return res.json(`created User:${data.firstName, data.lastName}`).status(201);
  } catch (error) {
    res.json({ message: "internal error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
};
