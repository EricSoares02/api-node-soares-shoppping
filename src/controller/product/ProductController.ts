import { NextFunction, Request, Response } from "express";
import {
  BadRequest,
  InternalError,
  Unauthorized,
} from "../../middleware/errors.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import {
  CreateProductType,
  ECategoryTypes,
  IProductParams,
  IProductQuery,
  Product,
} from "../../interfaces/IProduct";
import { ProductCore } from "../../core/product/productCore";
import { ProductService } from "../../services/product/ProductService";
import { ProductRepository } from "../../repositories/product/ProductRepository";
import {
  ResponseGet,
  ResponseToCreated,
} from "../../middleware/Response.express";
import { IParamsDictionary } from "../../interfaces/IParamsDictionary";
import { GetIdByJwtToken } from "../../middleware/getIdByToken.Jwt";

// schema de validação de Product
const ProductSchema = z.object({
  id: z.string().min(24).optional(),
  name: z.string().min(3),
  url_img: z.string().array(),
  price_in_cent: z.number().positive(),
  desc: z.string().optional(),
  subCategory: z.string(),
  category: z.nativeEnum(ECategoryTypes),
  options: z.array(z.string().array().max(7, "7 é o número máximo de opções")),
});

const IdSchema = z.string().min(24);

class ProductController {
  public validationProductPost(
    req: Request<IParamsDictionary, "", CreateProductType>,
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

  public async create(
    req: Request<IParamsDictionary, "", CreateProductType>,
    res: Response
  ) {
    // ---------------------------CHAMANDO CORE E SERVICE -----------------------------
    const core = new ProductCore();
    const service = new ProductService(new ProductRepository());

    //----------------------------PEGANDO O ID QUE VEM DENTRO DO TOKEN JWT QUE VEM NO HEADERS DA REQUISIÇÃO--------------------------------
    const token = await new ProductCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const UserId = await GetIdByJwtToken(token);
    if (UserId === null) {
      return new Unauthorized("token is required", res).returnError();
    }


    // ---------------------------VERIFICANDO AS SUBCATEGORIAS DO PRODUTO-----------------------------
    core.verifyCategories(req.body);


    // ---------------------------PEGANDO A LOJA PARA O PRODUTO-----------------------------
    const {storeId} = await core.getStoreId(UserId);
    if (!storeId) {
      return new Unauthorized("you need be a admin or master", res).returnError();
    }


    // ---------------------------CHAMANDO SERVICE E CRIANDO O PRODUTO-----------------------------
    const product = {
      name: req.body.name,
      url_img: req.body.url_img,
      price_in_cent: req.body.price_in_cent,
      desc: req.body.desc,
      category: req.body.category,
      subCategory: req.body.subCategory,
      options: req.body.options,
      storeId: storeId ?? ''
    }
    const created = await service.executeCreateProductRepository(product);
    if (created.id !== "") {
      const response = new ResponseToCreated(created);
      response.res(res);
    } else {
      return new InternalError("Internal Server Error", res).returnError();
    }
  }

  public async update(
    req: Request<IParamsDictionary, "", CreateProductType>,
    res: Response
  ) {
    // ---------------------------CHAMANDO CORE E SERVICE -----------------------------
    const core = new ProductCore();
    const service = new ProductService(new ProductRepository());
    const { id } = req.params;

    //----------------------------PEGANDO O ID QUE VEM DENTRO DO TOKEN JWT QUE VEM NO HEADERS DA REQUISIÇÃO--------------------------------
    const token = await new ProductCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const UserId = await GetIdByJwtToken(token);
    if (UserId === null) {
      return new Unauthorized("token is required", res).returnError();
    }

    //----------------------------VERIFICANDO SE O PRODUTO EXISTE----------------------
    const exist = await core.verifyProduct(id);
    if (!exist) {
      return new BadRequest("This Product does not exist", res).returnError();
    }

    // ---------------------------VERIFICANDO AS SUBCATEGORIAS DO PRODUTO-----------------------------
    core.verifyCategories(req.body);

    // ---------------------------VERIFICANDO SE A LOJA EXISTE -----------------------------
    const storeExist = await core.StoreExist(req.body.storeId);
    if (!storeExist) {
      return new BadRequest("This Store does not exist", res).returnError();
    }

    // ---------------------------VERIFICANDO SE O USER É UM ADMIN OU MASTER DA MSM LOJA QUE O PRODUTO-----------------------------
    const verifyUserStore = await core.verifyUserStore(
      UserId,
      req.body.storeId
    );
    if (!verifyUserStore) {
      return new BadRequest(
        "This User cannot create a product in this Store",
        res
      ).returnError();
    }

    // ---------------------------CHAMANDO SERVICE E ATUALIZANDO O PRODUTO-----------------------------
    const update = await service.executeUpdateProductRepositoy(id, req.body);
    if (update.id !== "") {
      const response = new ResponseToCreated(update);
      response.res(res);
    } else {
      return new InternalError("The Store does not exist", res).returnError();
    }
  }

  public async getAll(req: Request<"", Product[]>, res: Response) {
    const products = await new ProductService(
      new ProductRepository()
    ).executeGetAllProductRepository();
    //se o array de produtos não vier vazio, o enviamos como resposta da requisição
    if (products.length !== 0) {
      const response = new ResponseGet(products);
      response.res(res);
    } else {
      return new BadRequest("Not found Products", res).returnError();
    }
  }

  public async getById(req: Request<IProductParams>, res: Response) {
    //buscando o produto com o metodo executeGetByIdProductRepository no ProductService e passando o ProductRepository como parametro.
    const product = await new ProductService(
      new ProductRepository()
    ).executeGetByIdProductRepository(req.params.id);
    //se o produto existe, o enviamos como resposta da requisição
    if (product.id !== "") {
      const response = new ResponseGet(product);
      response.res(res);
    } else {
      return new BadRequest("The Product does not exist", res).returnError();
    }
  }

  public async search(
    req: Request<IProductParams, "", "", IProductQuery>,
    res: Response
  ) {
    const searchResult = await new ProductService(
      new ProductRepository()
    ).executeSearchProductRepository(req.query.name);
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
