import { Request, Response } from "express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { ProductService } from "../../services/product/ProductService";
import { ProductRepository } from "../../repositories/procuct/ProductRepository";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";

class ProductController {

  async create(req: Request, res: Response) {


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new Unauthorized("Token Is Required!", res).returnError();
        }


    //CRIANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeCreate(req.body, id);
        if (!product) {
            return new InternalError("Internal Server Error", res).returnError()
        }
        return new ResponseToCreated(product).res(res);


  }


  async update(req: Request, res: Response) {


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new Unauthorized("Token Is Required!", res).returnError();
        }


    //ATUALIZANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeUpdate(req.body, id);
        if (!product) {
            return new BadRequest("Something Is Wrong!", res).returnError()
        }
        return new ResponseToCreated(product).res(res);


  }


  async delete(req: Request, res: Response) {


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new Unauthorized("Token Is Required!", res).returnError();
        }


    //DELETANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeDelete(req.body, id);
        if (!product) {
            return new BadRequest("Something Is Wrong!", res).returnError()
        }
        return new ResponseToCreated(product).res(res);


  }


  async getByParams(req: Request, res: Response) {


    //BUSCANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeGetByParams(req.params.props);
        if (!product) {
            return new BadRequest("Something Is Wrong!", res).returnError()
        }
        return new ResponseGet(product).res(res);


  }


  async getByCategory(req: Request, res: Response) {


    //BUSCANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeGetByCategory(req.params.category);
        if (!product) {
            return new BadRequest("Something Is Wrong!", res).returnError()
        }
        return new ResponseGet(product).res(res);


  }


  async get(req: Request, res: Response) {


    //BUSCANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeGet(req.params.id);
        if (!product) {
            return new BadRequest("Something Is Wrong!", res).returnError()
        }
        return new ResponseGet(product).res(res);


  }
  

}

export { ProductController };
