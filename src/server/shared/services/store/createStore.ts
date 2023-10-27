import { Response } from "express";
import { prisma } from "../prisma/prisma";
import connect from "../../../database";
import { IStore } from "../../model/store/Store";

export const createStoreService = async (
  res: Response,
  data: IStore
) => {
  try {
    connect();
    await prisma.store.create({
      data: data,
    });
    return res.json(`created store:${data.name}`).status(201);
  } catch (error) {
    res.json({ message: "internal error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
};
