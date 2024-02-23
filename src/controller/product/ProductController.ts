import { Request, Response } from "express";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { ProductService } from "../../services/product/ProductService";
import { ProductRepository } from "../../repositories/procuct/ProductRepository";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { DefaultErrorResponseModule } from "../../middleware/@defaultErrorResponseModule/response";

class ProductController {

  async create(req: Request, res: Response) {


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //CRIANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeCreate(req.body, id);
        if (!product.data) {
            return new DefaultErrorResponseModule(product.status).returnResponse(res)
        }
        return new ResponseToCreated(product.data).res(res);


  }


  async update(req: Request, res: Response) {


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //ATUALIZANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeUpdate(req.body, id);
        if (!product.data) {
            return new DefaultErrorResponseModule(product.status).returnResponse(res)
        }
        return new ResponseToCreated(product.data).res(res);


  }


  async delete(req: Request, res: Response) {


    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? "").GetIdByToken();
        if (!id) {
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //DELETANDO PRODUCT
        const del = await new ProductService(new ProductRepository()).executeDelete(req.body, id);
        if (!del.data) {
            return new DefaultErrorResponseModule(del.status).returnResponse(res)
            }
    
            return new NoContent().res(res)


  }


  async getByParams(req: Request, res: Response) {


    //BUSCANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeGetByParams(req.params.props);
        if (!product.data) {
            return new DefaultErrorResponseModule(product.status).returnResponse(res)
        }
        return new ResponseGet(product.data).res(res);


  }


  async getByCategory(req: Request, res: Response) {


    //BUSCANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeGetByCategory(req.params.category);
        if (!product.data) {
            return new DefaultErrorResponseModule(product.status).returnResponse(res)
        }
        return new ResponseGet(product.data).res(res);


  }


  async get(req: Request, res: Response) {


    //BUSCANDO PRODUCT
        const product = await new ProductService(new ProductRepository()).executeGet(req.params.id);
        if (!product.data) {
            return new DefaultErrorResponseModule(product.status).returnResponse(res)
        }
        return new ResponseGet(product.data).res(res);


  }
  

}

export { ProductController };
