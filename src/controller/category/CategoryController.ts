import { Request, Response } from "express";
import { CategoryParams, CategoryType } from "../../interfaces/category/category";
import { CategoryService } from "../../services/category/CategoryService";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";

class CategoryController {

  create(req: Request<'', '',CategoryType>, res: Response){
    new CategoryService(new CategoryRepository, res).executeCreate(req.body);
  }

  update(req: Request<'', '',CategoryType>, res: Response){
    new CategoryService(new CategoryRepository, res).executeUpdate(req.body);
  }

  get(req: Request<CategoryParams>, res: Response){
    new CategoryService(new CategoryRepository, res).executeGet(req.params.id);
  }

  getByName(req: Request<CategoryParams>, res: Response){
    new CategoryService(new CategoryRepository, res).executeGetByName(req.params.name);
  }

  delete(req: Request<CategoryParams>, res: Response){
    new CategoryService(new CategoryRepository, res).executeDelete(req.params.id);
  }


}

export {CategoryController}