import { Request, Response } from "express";
import { ElderService } from "../../services/elder/ElderService";
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { Elder } from "../../interfaces/elder/elder";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";


class ElderController {


async create(req: Request<'', '', Elder>, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }
    
    //CRIANDO ELDER
        const elder = await new ElderService(new ElderRepository()).executeCreate(req.body, id)
        if (!elder.data) {
            return new DefaultErrorResponseModule(elder.status).returnResponse(res)
        }
        return new ResponseToCreated(elder.data).res(res)

}


async update(req: Request<'', '', Elder>, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }

        const data: Elder = {
            email: req.body.email,
            first_name: req.body.first_name,
            id: id,
            last_name: req.body.last_name,
            password: req.body.password,
            role: req.body.role
        }

    //ATUALIZANDO ELDER
        const elder = await new ElderService(new ElderRepository()).executeUpdate(data)
        if (!elder.data) {
            return new DefaultErrorResponseModule(elder.status).returnResponse(res)
        }
        return new ResponseToCreated(elder.data).res(res)

}



async get(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }

    //BUSCANDO O ELDER
        const elder = await new ElderService(new ElderRepository()).executeGet(id);
        if (!elder.data) {
            return new DefaultErrorResponseModule(elder.status).returnResponse(res)
        }
        return new ResponseGet(elder.data).res(res);

}



async getByEmail(req: Request<'', '', Elder>, res: Response){

    //BUSCANDO ELDER
        const elder = await new ElderService(new ElderRepository()).executeGetByEmail(req.body.email);
        if (!elder.data) {
            return new DefaultErrorResponseModule(elder.status).returnResponse(res)
        }
        return new ResponseGet(elder.data).res(res);

}



async delete(req: Request, res: Response){

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }

    //DELETANDO ELDER
      const del = await new ElderService(new ElderRepository()).executeDelete(id);


       if (!del.data) {
        return new DefaultErrorResponseModule(del.status).returnResponse(res)
        }

        return new NoContent().res(res)

}

}

export {ElderController}