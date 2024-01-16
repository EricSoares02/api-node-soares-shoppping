import { Schema, z } from "zod";
import { NextFunction, Request, Response } from "express";
import { Comment, ICommentParams } from "../../interfaces/IComment";
import { ValidationData } from "../../middleware/validationData.Zod";
import { CommentService } from "../../services/comment/CommentService";
import { CommentRepository } from "../../repositories/comment/CommentRepository";
import { BadRequest, InternalError } from "../../middleware/errors.express";
import { CommentCore } from "../../core/comment/CommentCore";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import Jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

const CommentSchema = z.object({
  authorId: z.string().min(24),
  product_commentedId: z.string().min(24),
  title: z.string().min(3),
  stars: z.number().nonnegative().lt(6),
});

const IdSchema = z.string().min(24);
const SchemaGetCommentByUser = z.string().min(15);


class CommentController {
  public validationCommentPost(
    req: Request<"", "", Comment>,
    res: Response,
    next: NextFunction
  ) { 
    const data = { data: req.body };
    ValidationData(CommentSchema, data, next);
  }

  public async validationCommentGet(
    req: Request<ICommentParams>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.params.id };
    ValidationData(IdSchema, data, next);
  }

  public async validationCommentGetByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    const data = req.headers.authorization ?? '';

    function ValidationDataToGetUser(Schema: Schema, next: NextFunction, data?: string) {
     try {
       Schema.parse(data)
      next()
     } catch (error) {
       if (error instanceof z.ZodError) {
         console.log("Some property is wrong or missing: " + error.issues);
       
       }
       next(error);
     }
   }

   ValidationDataToGetUser(SchemaGetCommentByUser, next, data);
  }

  public async create(req: Request<"", "", Comment>, res: Response) {
    const { authorId, product_commentedId, stars, title } = req.body;
    const core = new CommentCore();

    const productExist = await core.verifyProductExist(product_commentedId);
    const userExist = await core.verifyUserExist(authorId);


    // se user ou product não existe, retornamod um erro
    if (!userExist || !productExist) {
       return new BadRequest('User or Product dont Exist', res).returnError() 
    }

    //aqui criamos o comment chamando service de comment 
    const created = await new CommentService(
      new CommentRepository()
    ).executeCreateCommentRepository(
      authorId,
      product_commentedId,
      title,
      stars
    );

    if (created.id === "") {
      return new InternalError("Internal Server Error", res).returnError();
    }

    return new ResponseToCreated(created).res(res);
  }

  public async getByProduct(req: Request<ICommentParams>, res: Response) {
    const id = req.params.id;

    const comments = await new CommentService(
      new CommentRepository()
    ).executeGetCommentByProductRepository(id);

    return new ResponseGet(comments).res(res);
  }

  public async getByUser(req: Request, res: Response) {
    
    
    const token = await new CommentCore().decodedToken(req.headers.authorization ?? '')
    
    const { id } = Jwt.decode(token) as JwtPayload

    const comments = await new CommentService(
      new CommentRepository()
    ).executeGetCommentByUserRepository(id);

    return new ResponseGet(comments).res(res);
  }
}

export { CommentController };
