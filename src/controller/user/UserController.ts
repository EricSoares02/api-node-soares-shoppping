import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";

import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import {
  ResponseGet,
  ResponseToCreated,
} from "../../middleware/Response.express";
import { User } from "../../interfaces/user/user";
import { Request, Response } from "express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";




class UserController {
  

async create(req: Request<"", "", User>, res: Response) {

    //CRIANDO USER
        const user = await new UserService(new UserRepository()).executeCreate(req.body)
        if (!user) {
            return new InternalError("Internal Server Error", res).returnError()
        }
        return new ResponseToCreated(user).res(res);

}


async update(req: Request<"", "", User>, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

    //ATUALIZANDO USER
        const user = await new UserService(new UserRepository()).executeUpdate(req.body, id)
        if (!user) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseToCreated(user).res(res)

}

async get(req: Request, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

    //BUSCANDO O USER
        const user = await new UserService(new UserRepository()).executeGet(id);
        if (!user) {
            return new BadRequest('This User Does Not Exist!',res).returnError()
        }
        return new ResponseGet(user).res(res);

}

async getByEmail(req: Request<'', '', User>, res: Response){

    //BUSCANDO USER
        const user = await new UserService(new UserRepository()).executeGetByEmail(req.body.email);
        if (!user) {
            return new BadRequest('This User Does Not Exist!',res).returnError()
        }
        return new ResponseGet(user).res(res);

}

async delete(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

    //DELETANDO USER
        await new UserService(new UserRepository()).executeDelete(id);
}


  
}

export { UserController };
