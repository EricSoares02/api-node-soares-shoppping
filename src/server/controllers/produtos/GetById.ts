import { Request, Response } from "express";
import { IParamsProps } from "../../shared/model/ParamsProduct";
import { getProductByIdService } from "../../shared/services/produtos/getProductById";
import { z } from "zod";
import { validation } from "../../shared/middleware";

const schemaP = z.object({

  id: z.string()

})

export const getIdProductValidator = validation("params",schemaP);

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  try {
    const id:string | undefined = req.params.id;
    const productById = await getProductByIdService(id);
    return res.json({ message: "sucess", data: productById }).status(200);
  } catch (error) {
    res.json({ message: "error", error }).status(401);
  }
};