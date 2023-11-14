import { Request, Response } from "express";
import { voidGetCheck } from "../../shared/middleware/ValidationGet";
import { SearchProducts } from "../../shared/services/produtos/searchProduct";
import { IQueryProps } from "../../shared/model/product/ParamsProduct";

export const search = async (req: Request<IQueryProps>, res: Response) => {
  try {
    
    const result = await SearchProducts(req.query.filter);
    voidGetCheck(result, res);
  } catch (error) {
    console.log(error);
  }
};
