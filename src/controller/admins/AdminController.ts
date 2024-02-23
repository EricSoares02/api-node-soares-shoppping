import { Request, Response } from "express";
import { Admin } from "../../interfaces/admins/admin";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { AdminRepository } from "../../repositories/admins/AdminRepository";
import { AdminService } from "../../services/admins/AdminService";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";


class AdminController {
  

    async create(req: Request<"", "", Admin>, res: Response) {

        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }
    
        //CRIANDO ADMIN
            const admin = await new AdminService(new AdminRepository()).executeCreate(req.body, id)
            if (!admin.data) {
                return new DefaultErrorResponseModule(admin.status).returnResponse(res)
            }
            return new ResponseToCreated(admin.data).res(res);
    
    }
    
    
    async update(req: Request<"", "", Admin>, res: Response){
    
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
            }


            const data: Admin = {
                email: req.body .email,
                first_name: req.body.first_name,
                id: id,
                last_name: req.body.last_name,
                password: req.body.password,
                photo: req.body.photo,
                role: req.body.role,
                storeId: req.body.storeId
            }
    
        //ATUALIZANDO ADMIN
            const admin = await new AdminService(new AdminRepository()).executeUpdate(data)
            if (!admin.data) {
                return new DefaultErrorResponseModule(admin.status).returnResponse(res)
            }
            return new ResponseToCreated(admin.data).res(res)
    
    }
    
    async get(req: Request, res: Response) {
        
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
            }
    
        //BUSCANDO O ADMIN
            const admin = await new AdminService(new AdminRepository()).executeGet(id);
            if (!admin.data) {
                return new DefaultErrorResponseModule(admin.status).returnResponse(res)
            }
            return new ResponseGet(admin.data).res(res);
    
    }
    
    async getByEmail(req: Request<'', '', Admin>, res: Response){
    
        //BUSCANDO USER
            const admin = await new AdminService(new AdminRepository()).executeGetByEmail(req.body.email);
            if (!admin.data) {
                return new DefaultErrorResponseModule(admin.status).returnResponse(res)
            }
            return new ResponseGet(admin.data).res(res);
    
    }
    
    async delete(req: Request, res: Response){
    
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
            }
    
        //DELETANDO ADMIN
           const del = await new AdminService(new AdminRepository()).executeDelete(id);

            if (!del.data) {
                return new DefaultErrorResponseModule(del.status).returnResponse(res)
                }
        
                return new NoContent().res(res)
    }
    
    
      
    }
    
    export { AdminController };