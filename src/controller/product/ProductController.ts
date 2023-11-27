import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../middleware/errors.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { ECategoryTypes, Product } from "../../interfaces/IProduct";
import { ProductCore } from "../../core/product/productCore";
import { ProductService } from "../../services/product/ProductService";
import { ProductRepository } from "../../repositories/product/ProductRepository";
import { ResponseToCreated } from "../../middleware/Response.express";

// schema de validação de Product
const ProductSchema = z.object({
  name: z.string().min(3),
  url_img: z.string().array(),
  price_in_cent: z.number().positive(),
  desc: z.string().optional(),
  subCategory: z.string(),
  category: z.nativeEnum(ECategoryTypes),
  options: z.string().array().max(8, "8 é o número máximo de opções"),
  storeId: z.string().min(24),
});

class ProductController {
  public validationProduct(
    req: Request<"", "", Product>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(ProductSchema, data, next);
  }

  public async create(req: Request<"", "", Product>, res: Response) {
    const core = new ProductCore();
    //verificando as categorias
    core.verifyCategories(req.body);
    //verificando se a loja existe
    const storeExist = await core.StoreExist(req.body.storeId);
    //se a loja exite, chamamos service e criamos o produto
    if (storeExist) {
      const {
        name,
        category,
        desc,
        options,
        price_in_cent,
        storeId,
        subCategory,
        url_img,
      } = req.body;
     const created = await new ProductService(
        new ProductRepository()
      ).executeCreateProductRepository(
        name,
        url_img,
        price_in_cent,
        category,
        subCategory,
        options,
        storeId,
        desc
      );
      //se o id for diferente de vazio, significa que product foi criado e retornamos a resposta da requizição
      if (created.id !=="") {
        const response = new ResponseToCreated(created) 
        response.res(res)
      }
      // se a loja não existe, retornamos um erro
    } else {
      return new BadRequest("This Store does not exist", res).returnError();
    }
    
  }
}

export { ProductController };
