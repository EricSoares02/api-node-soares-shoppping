import { Request, Response } from "express";
import { CreateStoreMiddleware } from "../../shared/middleware/store/CreateStore";
import { IStore } from "../../shared/model/store/Store";



export const create = async (req: Request<"", "", IStore>, res: Response) => {
 
    CreateStoreMiddleware(req.body, res);
  console.log(req.body);
};
