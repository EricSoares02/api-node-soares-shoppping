import { Response, Request } from "express";
import { IStore } from "../../shared/model/store/Store";
import { CreateStoreMiddleware } from "../../shared/middleware/store/CreateStore";

export const create = async (req: Request<'', '', IStore>, res: Response) => {
    
    CreateStoreMiddleware(res, req.body)
};
  