
import { Request, Response } from "express";
import { CommentRepository } from "../../repositories/comment/CommentRepository";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { Comment } from '../../interfaces/comment/comment'
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { CommentService } from "../../services/comments/CommentsService";





class CommentController {

 
  async create(req: Request<"", "", Comment>, res: Response) {



    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }



        const data = {
            id: '',
            authorId: id,
            createdAt: req.body.createdAt,
            product_commentedId: req.body.product_commentedId,
            stars: req.body.stars,
            title: req.body.title
        }



    //CRIANDO COMMENT
        const create = await new CommentService(new CommentRepository()).executeCreate(data);
        if (!create) {
            return new InternalError("Internal Server Error", res).returnError()
        }
        return new ResponseToCreated(create).res(res);


  }




  async update(req: Request<"", "", Comment>, res: Response){


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }




    //ATUALIZANDO COMMENT
        const update = await new CommentService(new CommentRepository()).executeUpdate(req.body);
        if (!update) {
            return new InternalError("Internal Server Error", res).returnError()
        }
        return new ResponseToCreated(update).res(res);
  }




  async getByProduct(req: Request, res: Response) {
    
    
    //PROCURANDO COMMENT
        const comments = await new CommentService(new CommentRepository()).executeGetByProduct(req.params.id);
        if (!comments) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseGet(comments).res(res)

  }




  async getByUser(req: Request, res: Response) {
  
    

    //PEGANDO O ID DO USER QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }



    
    //PROCURANDO COMMENT
        const comments = await new CommentService(new CommentRepository()).executeGetByUser(id);
        if (!comments) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseGet(comments).res(res)

  }



  async delete(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }




    //DELETANDO COMMENT
        const del = await new CommentService(new CommentRepository()).executeDelete(req.params.id, id);
        if (!del) {
            return new BadRequest("Something Is Wrong!", res).returnError()
        }
        return 

  }


}

export { CommentController };
