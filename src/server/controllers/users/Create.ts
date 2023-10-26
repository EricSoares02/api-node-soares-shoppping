import { Request, Response } from "express";
import { CreateUserMiddleware } from "../../shared/middleware/user/create";
import { IUser } from "../../shared/model/user/User";



export const create = async (req: Request<"", "", IUser>, res: Response) => {
 
  CreateUserMiddleware(req.body, res);
  console.log(req.body);
};
