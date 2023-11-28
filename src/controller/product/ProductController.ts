import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../middleware/errors.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { ECategoryTypes, IProductParams, IProductQuery, Product } from "../../interfaces/IProduct";
import { ProductCore } from "../../core/product/productCore";
import { ProductService } from "../../services/product/ProductService";
import { ProductRepository } from "../../repositories/product/ProductRepository";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";

// schema de validação de Product
const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  url_img: z.string().array(),
  price_in_cent: z.number().positive(),
  desc: z.string().optional(),
  subCategory: z.string(),
  category: z.nativeEnum(ECategoryTypes),
  options: z.string().array().max(8, "8 é o número máximo de opções"),
  storeId: z.string().min(24),
});

const IdSchema =  z.string().min(24)


class ProductController {
  

  public validationProductPost(
    req: Request<"", "", Product>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(ProductSchema, data, next);
  }

  public validationProductGet(
    req: Request<IProductParams>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.params.id };
    ValidationData(IdSchema, data, next);
  }

  public async create(req: Request<"", "", Product>, res: Response) {
    const core = new ProductCore();
    const service = new ProductService(new ProductRepository());
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
      const created = await service.executeCreateProductRepository(
        name,
        url_img,
        price_in_cent,
        category,
        subCategory,
        options,
        storeId,
        desc
      );
      //se o id for diferente de vazio, significa que product foi criado e retornamos a resposta da requisição
      if (created.id !== "") {
        const response = new ResponseToCreated(created);
        response.res(res);
      }
      // se a loja não existe, retornamos um erro
    } else {
      return new BadRequest("This Store does not exist", res).returnError();
    }
  }

  public async update(req: Request<"", "", Product>, res: Response) {
    const core = new ProductCore();
    const service = new ProductService(new ProductRepository());
    //verificando se o produto existe
    const exist = await core.verifyProduct(req.body.id);
    if (!exist) {
      return new BadRequest("This Product does not exist", res).returnError();
    }

    //verificando as categorias
    core.verifyCategories(req.body);
    //verificando se a loja existe
    const storeExist = await core.StoreExist(req.body.storeId);
    //se a loja exite, chamamos service e criamos o produto
    if (storeExist) {
      const update = await service.executeUpdateProductRepositoy(req.body);
      //se o id for diferente de vazio, significa que product foi criado e retornamos a resposta da requizição
      if (update.id !== "") {
        const response = new ResponseToCreated(update);
        response.res(res);
      }
      // se a loja não existe, retornamos um erro
    } else {
      return new BadRequest("The Store does not exist", res).returnError();
    }
  }

  public async getAll(req: Request<"", Product[]>, res: Response){
    const products = await new ProductService(new ProductRepository()).executeGetAllProductRepository();
    //se o array de produtos não vier vazio, o enviamos como resposta da requisição
    if (products.length !== 0) {
      const response = new ResponseGet(products);
      response.res(res);
    } else {
      return new BadRequest("Not found Products", res).returnError();
    }
  }

  public async getById(req: Request<IProductParams>, res: Response){
    //buscando o produto com o metodo executeGetByIdProductRepository no ProductService e passando o ProductRepository como parametro.
    const product = await new ProductService(new ProductRepository()).executeGetByIdProductRepository(req.params.id)
    //se o produto existe, o enviamos como resposta da requisição
    if (product.id !== "") {
      const response = new ResponseGet(product);
      response.res(res);
    } else {
      return new BadRequest("The Product does not exist", res).returnError();
    }

  }

  public async search(req: Request<IProductParams, '','',IProductQuery>, res: Response){

    const searchResult = await new ProductService(new ProductRepository()).executeSearchProductRepository(req.query.name);
    //se o array de produtos não vier vazio, o enviamos como resposta da requisição
    if (searchResult.length !== 0) {
      const response = new ResponseGet(searchResult);
      response.res(res);
    } else {
      return new BadRequest("Not found Products", res).returnError();
    }

  }

}

export { ProductController };
