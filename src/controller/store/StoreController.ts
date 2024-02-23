import { Request, Response } from "express";
import { Store } from "../../interfaces/store/store";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { StoreService } from "../../services/store/storeService";
import { StoreRepository } from "../../repositories/store/storeRepository";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";



class StoreController{

async create(req: Request<"", "", Store>, res: Response){
        
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }

        //CRIANDO A STORE
        const create = await new StoreService(new StoreRepository()).executeCreate(req.body, id)
        if (!create.data) {
            return new DefaultErrorResponseModule(create.status).returnResponse(res)
        }
        return new ResponseToCreated(create.data).res(res);
}



async update(req: Request<"", "", Store>, res: Response){
        
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }

        //ATUALIZANDO A STORE
        const update = await new StoreService(new StoreRepository()).executeUpdate(req.body, id)
        if (!update.data) {
            return new DefaultErrorResponseModule(update.status).returnResponse(res)
        }
        return new ResponseToCreated(update.data).res(res);
}



async get(req: Request, res: Response){
        

    //BUSCANDO A STORE
    const store = await new StoreService(new StoreRepository()).executeGet(req.params.id)
    if (!store.data) {
        return new DefaultErrorResponseModule(store.status).returnResponse(res)
    }
    return new ResponseGet(store.data).res(res)
}



async getByCnpj(req: Request, res: Response){
        

    //BUSCANDO A STORE
    const store = await new StoreService(new StoreRepository()).executeGetByCnpj(req.params.cnpj)
    if (!store.data) {
        return new DefaultErrorResponseModule(store.status).returnResponse(res)
    }
    return new ResponseGet(store.data).res(res)
}



async delete(req: Request, res: Response){
        

    //BUSCANDO A STORE
    const store = await new StoreService(new StoreRepository()).executeDelete(req.params.id)
    if (!store.data) {
        return new DefaultErrorResponseModule(store.status).returnResponse(res)
    }
    
    return new NoContent().res(res)
}

}

export { StoreController }