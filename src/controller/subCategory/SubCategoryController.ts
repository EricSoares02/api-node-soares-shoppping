import { Request, Response } from "express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { SubCategory } from "../../interfaces/subcategory/subCategory";
import { SubCategoryService } from "../../services/subCategory/SubCategoryService";
import { SubCategoryRepository } from "../../repositories/subCategory/subCategoryRepository";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";

class SubCategoryController {


  async create(req: Request<'', '', SubCategory>, res: Response) {

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //CRIANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeCreate(req.body, id);
        if (!subcategory.data) {
            return new DefaultErrorResponseModule(subcategory.status).returnResponse(res)
        }
        return new ResponseToCreated(subcategory.data).res(res);

  }


  async update(req: Request<'', '', SubCategory>, res: Response){


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //ATUALIZANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeUpdate(req.body, id);
        if (!subcategory.data) {
            return new DefaultErrorResponseModule(subcategory.status).returnResponse(res)
        }
        return new ResponseToCreated(subcategory.data).res(res);
    

  }


  async get(req: Request, res: Response){


    //BUSCANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeGet(req.params.id);
        if (!subcategory.data) {
            return new DefaultErrorResponseModule(subcategory.status).returnResponse(res)
        }
        return new ResponseGet(subcategory.data).res(res);
 

  }


  async checkByCategory(req: Request, res: Response){


    //BUSCANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeCheckByCategory(req.body.name, req.body.categoryName);
        if (!subcategory.data) {
            return new DefaultErrorResponseModule(subcategory.status).returnResponse(res)
        }
        return new ResponseGet(subcategory.data).res(res);
 

  }

  async delete(req: Request, res: Response){


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //DELETANDO SUBCATEGORY
       const del = await new SubCategoryService(new SubCategoryRepository()).executeDelete(req.params.id, id);
       
        if (!del.data) {
            return new DefaultErrorResponseModule(del.status).returnResponse(res)
            }
    
            return new NoContent().res(res)

  }
}

export { SubCategoryController };
