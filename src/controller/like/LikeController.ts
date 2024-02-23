import { Request, Response } from "express"
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";

import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { LikeRepository } from "../../repositories/like/LikeRepository";
import { LikeService } from "../../services/like/LikeService";
import { Like } from "../../interfaces/like/like";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";



class LikeController {


    async like(req: Request<'', '', Like>, res: Response){


        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
            }

           
            const data = {
                authorId: id,
                commentId: req.body.commentId,
                id: req.body.id,
                makedAt: req.body.makedAt
            }

        //CURTINDO 
            const like = await new LikeService(new LikeRepository()).executeLike(data)
            if (!like.data) {
                return new DefaultErrorResponseModule(like.status).returnResponse(res)
            }
            return new ResponseToCreated(like.data).res(res);

            
    }



    async getByUser(req: Request, res: Response){


        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
            }

           


        //BUSCANDO LIKES
            const likes = await new LikeService(new LikeRepository()).executeGetByUser(id)
            if (!likes.data) {
                return new DefaultErrorResponseModule(likes.status).returnResponse(res)
            }
            return new ResponseGet(likes.data).res(res);

            
    }




    async get(req: Request, res: Response){


        //BUSCANDO LIKE
            const like = await new LikeService(new LikeRepository()).executeGet(req.params.id)
            if (!like.data) {
                return new DefaultErrorResponseModule(like.status).returnResponse(res)
            }
            return new ResponseGet(like.data).res(res);

            
    }




    async dislike(req: Request, res: Response){


        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
            }

           

        //DESCURTINDO
           const del = await new LikeService(new LikeRepository()).executeDislike(req.params.id, id)
           
           if (!del.data) {
            return new DefaultErrorResponseModule(del.status).returnResponse(res)
            }

            return new NoContent().res(res)
            
    }


}

export { LikeController }