import { Authorization } from "../../shared/middleware/Authorization";
import { CreateCommentMiddleware } from "../../shared/middleware/comment/CreateComment";
import { IComments, ICommentsParams } from "../../shared/model/product/Produto";
import { NextFunction, Request, Response} from "express";

export const create = async (req: Request<'','',IComments, ICommentsParams >, res: Response, next:NextFunction) => {
  
    const {authorization} = req.headers 
    const pass = authorization || ''
    Authorization(pass, res, next)
    
    CreateCommentMiddleware(req.query,req.body, res)
  };
  
