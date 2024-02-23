import { Request, Response} from 'express'
import { CartService } from "../../services/cart/CartService";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { NoContent, ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { Cart, CartTypeToCreate } from "../../interfaces/cart/cart";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";
import { DefaultErrorResponseModule } from '../../middleware/@defaultErrorResponseModule/response';




class CartController {


  async create(req: Request<'', '', CartTypeToCreate>, res: Response) {

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //CRIANDO O CARRINHO
        const cart = await new CartService(new CartRepository()).executeCreate(
            {
                ownerId: id,
                products: req.body.products
            }
        )
        if (!cart.data) {
            return new DefaultErrorResponseModule(cart.status).returnResponse(res)
        }

        return new ResponseToCreated(cart.data).res(res);

  }


  async update(req: Request<'', '', Cart>, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //ATUALIZANDO O CARRINHO
        const cart = await new CartService(new CartRepository()).executeUpdate({
            id: req.body.id,
            ownerId: id,
            products: req.body.products            
        })
        if (!cart.data) {
            return new DefaultErrorResponseModule(cart.status).returnResponse(res)
        }

        return new ResponseToCreated(cart.data).res(res);
  }



  async get(req: Request, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //BUSCANDO O CARRINHO
        const cart = await new CartService(new CartRepository()).executeGet(id)
        if (!cart.data) {
            return new DefaultErrorResponseModule(cart.status).returnResponse(res)
        }

        return new ResponseGet(cart.data).res(res);
  }



  async delete(req: Request, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new DefaultErrorResponseModule(401).returnResponse(res)
        }


    //DELETANDO O CARRINHO
        const del = await new CartService(new CartRepository()).executeDelete(id)
        if (!del.data) {
            return new DefaultErrorResponseModule(del.status).returnResponse(res)
        }

        return new NoContent().res(res)
  }


}

export { CartController };
