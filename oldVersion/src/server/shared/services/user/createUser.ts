import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";
import { IUser } from "../../model/user/User";

export const createUserService = async ( data: IUser, res: Response) => {
  try {
    connect();
    await prisma.user.create({
      data: data,
    });
    return res.status(201).json(`created user:${data.first_name}`);
  } catch (error) {
    res.status(500).json({ message: "internal Prisma error" });
  } finally {
    await prisma.$disconnect();
  }
};
