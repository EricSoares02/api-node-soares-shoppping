import { Request, Response } from "express";
import { Admin } from "../../interfaces/admins/admin";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { AdminRepository } from "../../repositories/admins/AdminRepository";
import { AdminService } from "../../services/admins/AdminService";


class AdminController {
  

    async create(req: Request<"", "", Admin>, res: Response) {

        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }
    
        //CRIANDO ADMIN
            const admin = await new AdminService(new AdminRepository()).executeCreate(req.body, id)
            if (!admin) {
                return new InternalError("Internal Server Error", res).returnError()
            }
            return new ResponseToCreated(admin).res(res);
    
    }
    
    
    async update(req: Request<"", "", Admin>, res: Response){
    
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new Unauthorized('Token Is Required!',res).returnError()
            }
    
        //ATUALIZANDO ADMIN
            const admin = await new AdminService(new AdminRepository()).executeUpdate(req.body, id)
            if (!admin) {
                return new BadRequest('Something Is Wrong!',res).returnError()
            }
            return new ResponseToCreated(admin).res(res)
    
    }
    
    async get(req: Request, res: Response) {
        
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new Unauthorized('Token Is Required!',res).returnError()
            }
    
        //BUSCANDO O ADMIN
            const admin = await new AdminService(new AdminRepository()).executeGet(id);
            if (!admin) {
                return new BadRequest('This User Does Not Exist!',res).returnError()
            }
            return new ResponseGet(admin).res(res);
    
    }
    
    async getByEmail(req: Request<'', '', Admin>, res: Response){
    
        //BUSCANDO USER
            const admin = await new AdminService(new AdminRepository()).executeGetByEmail(req.body.email);
            if (!admin) {
                return new BadRequest('This User Does Not Exist!',res).returnError()
            }
            return new ResponseGet(admin).res(res);
    
    }
    
    async delete(req: Request, res: Response){
    
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new Unauthorized('Token Is Required!',res).returnError()
            }
    
        //DELETANDO ADMIN
            await new AdminService(new AdminRepository()).executeDelete(id);
    }
    
    
      
    }
    
    export { AdminController };