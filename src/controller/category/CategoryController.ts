import { Request, Response } from "express";
import { Category } from "../../interfaces/category/category";
import { CategoryService } from "../../services/category/CategoryService";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";

class CategoryController {



    async create(req: Request<'', '',Category>, res: Response){

          //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
          const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
          if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
          }

          //CRIANDO A CATEGORIA
          const category = await new CategoryService(new CategoryRepository).executeCreate(req.body, id);
          if (!category.data) {
            return new DefaultErrorResponseModule(category.status).returnResponse(res)
        }
        return new ResponseToCreated(category.data).res(res);

    }


    async update(req: Request<'', '',Category>, res: Response){

        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


        //ATUALIZANDO CATEGORIA
        const category = await new CategoryService(new CategoryRepository).executeUpdate(req.body, id)
        if (!category.data) {
            return new DefaultErrorResponseModule(category.status).returnResponse(res)
        }
        return new ResponseToCreated(category.data).res(res)

    
    }


    async get(req: Request, res: Response){
    
        //PROCURANDO CATEGORIA
        const category = await new CategoryService(new CategoryRepository).executeGet(req.params.id);
        if (!category.data) {
            return new DefaultErrorResponseModule(category.status).returnResponse(res)
        }
        return new ResponseGet(category.data).res(res)

    }


    async getByName(req: Request, res: Response){
        
        //PROCURANDO CATEGORIA
        const category = await new CategoryService(new CategoryRepository).executeGetByName(req.params.name);
        if (!category.data) {
            return new DefaultErrorResponseModule(category.status).returnResponse(res)
        }
        return new ResponseGet(category.data).res(res)
    }


    async delete(req: Request, res: Response){
      
        //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
            const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
            if(!id){
                return new DefaultErrorResponseModule(401).returnResponse(res)
            }

            
            const del = await new CategoryService(new CategoryRepository).executeDelete(req.params.id, id);
            if (!del.data) {
                return new DefaultErrorResponseModule(del.status).returnResponse(res)
            }

            return new NoContent().res(res)
    }


}

export {CategoryController}