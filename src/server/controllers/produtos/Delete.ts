import { Request, Response } from "express";
import { IParamsProps } from "../../shared/model/product/ParamsProduct";
import { TestingId } from "../../shared/middleware/products/DeleteProduct";
import { deleteProductsService } from "../../shared/services/produtos/deleteProduct";

export const delet = async (req: Request<IParamsProps>, res: Response) => {
  console.log(req.params.id);

  const id: string = req.params.id || "";

  TestingId(id, res);

  deleteProductsService(id, res);
};
