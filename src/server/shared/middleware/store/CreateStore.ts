import { Response } from "express";
import { IStore } from "../../model/store/Store";
import { z } from "zod";
import connect from "../../../database";
import { prisma } from "../../services/prisma/prisma";
import { createStoreService } from "../../services/store/createStore";

// schema de validação de store
const StoreSchema = z.object({
  name: z.string().min(3),
  email: z.string().email("email format is required"),
  password: z.string(),
  url_img: z.string().url(),
  cnpj: z.number(),
  desc: z.string().optional(),
});

export function CreateStoreMiddleware(res: Response, data: IStore) {
  //validando se data
  StoreSchema.parse(data);

  const { email, cnpj } = data;
  let exist: boolean = false;
  async function FindInDB() {
    try {
      connect();
      const result = await prisma.store
        .findFirst({
          where: {
            OR: [
              {
                email: email,
              },
              {
                cnpj: cnpj,
              },
            ],
          },
        })
        .then((response) => (response ? (exist = true) : (exist = false)));

      console.log(result);
      return exist;
    } catch (error) {
      res.json({ message: "internal error" }).status(500);
    } finally {
      await prisma.$disconnect();
    }
  }
  FindInDB();

  if (exist) {
    res.json({ message: "this store exist" });
    console.log("this store exist");
  } else {
    createStoreService(res, data);
  }
}
