import { Request, Response } from "express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { SubCategory } from "../../interfaces/subcategory/subCategory";
import { SubCategoryService } from "../../services/subCategory/SubCategoryService";
import { SubCategoryRepository } from "../../repositories/subCategory/subCategoryRepository";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";

class SubCategoryController {


  async create(req: Request<'', '', SubCategory>, res: Response) {

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new Unauthorized("Token Is Required!", res).returnError();
        }


    //CRIANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeCreate(req.body, id);
        if (!subcategory) {
            return new InternalError("Internal Server Error", res).returnError()
        }
        return new ResponseToCreated(subcategory).res(res);

  }


  async update(req: Request<'', '', SubCategory>, res: Response){


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new Unauthorized("Token Is Required!", res).returnError();
        }


    //ATUALIZANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeUpdate(req.body, id);
        if (!subcategory) {
            return new BadRequest('Something Is Wrong!',res).returnError()
        }
        return new ResponseToCreated(subcategory).res(res);
    

  }


  async get(req: Request, res: Response){


    //BUSCANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeGet(req.params.id);
        if (!subcategory) {
            return new BadRequest('This SubCategory Not Exist!',res).returnError()
        }
        return new ResponseGet(subcategory).res(res);
 

  }


  async getByName(req: Request, res: Response){


    //BUSCANDO SUBCATEGORY
        const subcategory = await new SubCategoryService(new SubCategoryRepository()).executeGetByName(req.params.name);
        if (!subcategory) {
            return new BadRequest('This SubCategory Not Exist!',res).returnError()
        }
        return new ResponseGet(subcategory).res(res);
 

  }

  async delete(req: Request<'', '', SubCategory>, res: Response){


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new Unauthorized("Token Is Required!", res).returnError();
        }


    //DELETANDO SUBCATEGORY
        await new SubCategoryService(new SubCategoryRepository()).executeDelete(req.body.id, id);
       
    

  }
}

export { SubCategoryController };
