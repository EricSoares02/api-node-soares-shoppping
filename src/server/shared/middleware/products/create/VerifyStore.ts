import { Response } from "express";
import connect from "../../../../database";
import { prisma } from "../../../services/prisma/prisma";

export async function VerifyStore(cnpj: number, res: Response) {
  try {
    connect();
    await prisma.store.findFirst({
      where: { cnpj: cnpj },
    });
  } catch (error) {
    res.json({ message: "internal error" }).status(500);
  } finally {
    await prisma.$disconnect();
  }
}
