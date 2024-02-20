import { Request, Response } from "express";
import { Category } from "../../interfaces/category/category";
import { CategoryService } from "../../services/category/CategoryService";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";

class CategoryController {



    async create(req: Request<'', '',Category>, res: Response){

          //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
          const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
          if(!id){
              return new Unauthorized('Token Is Required!',res).returnError()
          }

          //CRIANDO A CATEGORIA
          const category = await new CategoryService(new CategoryRepository).executeCreate(req.body, id);
          if (!category) {
            return new InternalError("Internal Server Error", res).returnError()
        }
        return new ResponseToCreated(category).res(res);

    }


    async update(req: Request<'', '',Category>, res: Response){

        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }


        //ATUALIZANDO CATEGORIA
        const category = await new CategoryService(new CategoryRepository).executeUpdate(req.body, id)
        if (!category) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseToCreated(category).res(res)

    
    }


    async get(req: Request, res: Response){
    
        //PROCURANDO CATEGORIA
        const category = await new CategoryService(new CategoryRepository).executeGet(req.params.id);
        if (!category) {
          return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseGet(category).res(res)

    }


    async getByName(req: Request, res: Response){
        
        //PROCURANDO CATEGORIA
        const category = await new CategoryService(new CategoryRepository).executeGetByName(req.params.name);
        if (!category) {
          return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseGet(category).res(res)
    }


    async delete(req: Request, res: Response){
      
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }

       await new CategoryService(new CategoryRepository).executeDelete(req.params.id, id);
    }


}

export {CategoryController}