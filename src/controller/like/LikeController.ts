import { Request, Response } from "express"
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { LikeRepository } from "../../repositories/like/LikeRepository";
import { LikeService } from "../../services/like/LikeService";
import { Like } from "../../interfaces/like/like";



class LikeController {


    async like(req: Request<'', '', Like>, res: Response){


        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new Unauthorized('Token Is Required!',res).returnError()
            }

           
            const data = {
                authorId: id,
                commentId: req.body.commentId,
                id: req.body.id,
                makedAt: req.body.makedAt
            }

        //CURTINDO 
            const like = await new LikeService(new LikeRepository()).executeLike(data)
            if (!like) {
                return new InternalError("Internal Server Error", res).returnError()
            }
            return new ResponseToCreated(like).res(res);

            
    }



    async getByUser(req: Request, res: Response){


        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new Unauthorized('Token Is Required!',res).returnError()
            }

           


        //BUSCANDO LIKES
            const likes = await new LikeService(new LikeRepository()).executeGetByUser(id)
            if (!likes) {
                return new BadRequest("Something Is Wrong!", res).returnError()
            }
            return new ResponseGet(likes).res(res);

            
    }




    async get(req: Request, res: Response){


        //BUSCANDO LIKE
            const like = await new LikeService(new LikeRepository()).executeGet(req.params.id)
            if (!like) {
                return new BadRequest("Something Is Wrong!", res).returnError()
            }
            return new ResponseGet(like).res(res);

            
    }




    async dislike(req: Request, res: Response){


        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new Unauthorized('Token Is Required!',res).returnError()
            }

           

        //DESCURTINDO
            await new LikeService(new LikeRepository()).executeDislike(req.params.id, id)
           

            
    }


}

export { LikeController }