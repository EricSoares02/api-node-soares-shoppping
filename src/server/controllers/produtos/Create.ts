import { Request, Response } from "express";
import { CreateProductMiddleware } from "../../shared/middleware/products/create/CreateProduct";


export const create = async (req: Request, res: Response) => {
  
  CreateProductMiddleware(res,req.body, req.params.storeId)
};
