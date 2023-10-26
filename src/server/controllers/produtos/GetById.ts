import { Request, Response } from "express";
import { IParamsProps } from "../../shared/model/product/ParamsProduct";
import { getProductByIdService } from "../../shared/services/produtos/getProductById";
import { z } from "zod";
import { validation } from "../../shared/middleware";
import { voidGetCheck } from "../../shared/middleware/ValidationGet";

const schemaP = z.object({
  id: z.string(),
});

export const getIdProductValidator = validation("params", schemaP);

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  try {
    const id: string | undefined = req.params.id;
    const productById = await getProductByIdService(id);
    voidGetCheck(productById, res);
  } catch (error) {
    res.json({ message: "error", error }).status(401);
  }
};
