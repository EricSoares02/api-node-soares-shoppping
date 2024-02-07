import { Request, Response } from "express";
import { ElderService } from "../../services/elder/ElderService";
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { Elder } from "../../interfaces/elder/elder";
import { BadRequest, Unauthorized } from "../../middleware/errors.express";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";


class ElderController {


async create(req: Request<'', '', Elder>, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }
    
    //CRIANDO ELDER
        const elder = await new ElderService(new ElderRepository()).executeCreate(req.body, id)
        if (!elder) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseToCreated(elder).res(res)

}


async update(req: Request<'', '', Elder>, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

    //ATUALIZANDO ELDER
        const elder = await new ElderService(new ElderRepository()).executeUpdate(req.body, id)
        if (!elder) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseToCreated(elder).res(res)

}

async get(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

    //BUSCANDO O ELDER
        const elder = await new ElderService(new ElderRepository()).executeGet(id);
        if (!elder) {
            return new BadRequest('This Elder Does Not Exist!',res).returnError()
        }
        return new ResponseGet(elder).res(res);

}

async getByEmail(req: Request<'', '', Elder>, res: Response){

    //BUSCANDO ELDER
        const elder = await new ElderService(new ElderRepository()).executeGetByEmail(req.body.email);
        if (!elder) {
            return new BadRequest('This Elder Does Not Exist!',res).returnError()
        }
        return new ResponseGet(elder).res(res);

}


async delete(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

    //DELETANDO ELDER
        await new ElderService(new ElderRepository()).executeDelete(id);

}

}

export {ElderController}