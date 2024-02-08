import { Request, Response } from "express";
import { Store } from "../../interfaces/store/store";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { StoreService } from "../../services/store/storeService";
import { StoreRepository } from "../../repositories/store/storeRepository";
import { ResponseToCreated } from "../../middleware/Response.express";



class StoreController{

async create(req: Request<"", "", Store>, res: Response){
        
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

        //CRIANDO A STORE
        const create = await new StoreService(new StoreRepository()).executeCreate(req.body, id)
        if (!create) {
            return new InternalError("Internal Server Error", res).returnError()
        }
        return new ResponseToCreated(create).res(res);
}



async update(req: Request<"", "", Store>, res: Response){
        
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

        //ATUALIZANDO A STORE
        const update = await new StoreService(new StoreRepository()).executeUpdate(req.body, id)
        if (!update) {
            return new BadRequest("Something is Wrong!", res).returnError()
        }
        return new ResponseToCreated(update).res(res);
}



async get(req: Request, res: Response){
        

    //BUSCANDO A STORE
    const store = await new StoreService(new StoreRepository()).executeGet(req.params.id)
    if (!store) {
        return new BadRequest("Something is Wrong!", res).returnError()
    }
    return new ResponseToCreated(store).res(res);
}



async getByCnpj(req: Request, res: Response){
        

    //BUSCANDO A STORE
    const store = await new StoreService(new StoreRepository()).executeGetByCnpj(req.params.cnpj)
    if (!store) {
        return new BadRequest("Something is Wrong!", res).returnError()
    }
    return new ResponseToCreated(store).res(res);
}



async delete(req: Request, res: Response){
        

    //BUSCANDO A STORE
    const store = await new StoreService(new StoreRepository()).executeDelete(req.params.id)
    if (!store) {
        return new BadRequest("Something is Wrong!", res).returnError()
    }
    return new ResponseToCreated(store).res(res);
}

}

export { StoreController }