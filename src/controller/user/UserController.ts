import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";


import {
    NoContent,
  ResponseGet,
  ResponseToCreated,
} from "../../middleware/Response.express";
import { User } from "../../interfaces/user/user";
import { Request, Response } from "express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";




class UserController {
  

async create(req: Request<"", "", User>, res: Response) {

    //CRIANDO USER
        const user = await new UserService(new UserRepository()).executeCreate(req.body)
        if (!user.data) {
            return new DefaultErrorResponseModule(user.status).returnResponse(res)
        }
        return new ResponseToCreated(user.data).res(res);

}


async update(req: Request<"", "", User>, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


        const data: User = {
            email: req.body.email,
            first_name: req.body.first_name,
            id: id,
            last_name: req.body.last_name,
            password: req.body.password,
            photo: req.body.photo
        }

    //ATUALIZANDO USER
        const user = await new UserService(new UserRepository()).executeUpdate(data)
        if (!user.data) {
            return new DefaultErrorResponseModule(user.status).returnResponse(res)
        }
        return new ResponseToCreated(user.data).res(res)

}

async get(req: Request, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }

    //BUSCANDO O USER
        const user = await new UserService(new UserRepository()).executeGet(id);
        if (!user.data) {
            return new DefaultErrorResponseModule(user.status).returnResponse(res)
        }
        return new ResponseGet(user.data).res(res);

}

async getByEmail(req: Request<'', '', User>, res: Response){

    //BUSCANDO USER
        const user = await new UserService(new UserRepository()).executeGetByEmail(req.body.email);
        if (!user.data) {
            return new DefaultErrorResponseModule(user.status).returnResponse(res)
        }
        return new ResponseGet(user.data).res(res);

}

async delete(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }

    //DELETANDO USER
        const del = await new UserService(new UserRepository()).executeDelete(id);

        if (!del.data) {
            return new DefaultErrorResponseModule(del.status).returnResponse(res)
            }
    
            return new NoContent().res(res)

}


  
}

export { UserController };
