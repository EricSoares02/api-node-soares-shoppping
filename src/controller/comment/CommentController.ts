
import { Request, Response } from "express";
import { CommentRepository } from "../../repositories/comment/CommentRepository";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { Comment } from '../../interfaces/comment/comment'
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { CommentService } from "../../services/comments/CommentsService";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";





class CommentController {

 
  async create(req: Request<"", "", Comment>, res: Response) {



    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
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
        if (!create.data) {
            return new DefaultErrorResponseModule(create.status).returnResponse(res)
        }
        return new ResponseToCreated(create.data).res(res);


  }




  async update(req: Request<"", "", Comment>, res: Response){


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }




    //ATUALIZANDO COMMENT
        const update = await new CommentService(new CommentRepository()).executeUpdate(req.body);
        if (!update.data) {
            return new DefaultErrorResponseModule(update.status).returnResponse(res)
        }
        return new ResponseToCreated(update.data).res(res);
  }




  async getByProduct(req: Request, res: Response) {
    
    
    //PROCURANDO COMMENT
        const comments = await new CommentService(new CommentRepository()).executeGetByProduct(req.params.id);
        if (!comments.data) {
            return new DefaultErrorResponseModule(comments.status).returnResponse(res)
        }
        return new ResponseGet(comments.data).res(res)

  }






  async get(req: Request, res: Response) {
    
    
    //PROCURANDO COMMENT
        const comments = await new CommentService(new CommentRepository()).executeGet(req.params.id);
        if (!comments.data) {
            return new DefaultErrorResponseModule(comments.status).returnResponse(res)
        }
        return new ResponseGet(comments.data).res(res)

  }




  async getByUser(req: Request, res: Response) {
  
    

    //PEGANDO O ID DO USER QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }



    
    //PROCURANDO COMMENT
        const comments = await new CommentService(new CommentRepository()).executeGetByUser(id);
        if (!comments.data) {
            return new DefaultErrorResponseModule(comments.status).returnResponse(res)
        }
        return new ResponseGet(comments.data).res(res)

  }



  async delete(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }




    //DELETANDO COMMENT
        const del = await new CommentService(new CommentRepository()).executeDelete(req.params.id, id);

        if (!del.data) {
            return new DefaultErrorResponseModule(del.status).returnResponse(res)
            }
    
            return new NoContent().res(res)

  }


}

export { CommentController };
