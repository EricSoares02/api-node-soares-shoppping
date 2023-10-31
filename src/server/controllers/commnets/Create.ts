import { CreateCommentMiddleware } from "../../shared/middleware/comment/CreateComment";
import { IComments } from "../../shared/model/product/Produto";
import { Request, Response} from "express";

export const create = async (req: Request<'','',IComments>, res: Response) => {
  
    CreateCommentMiddleware(req.body, res)
  };
  
