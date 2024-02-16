import { Request, Response} from 'express'
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { CartService } from "../../services/cart/CartService";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { Cart, CartTypeToCreate } from "../../interfaces/cart/cart";
import { JwtMiddleware } from "../../middleware/Jwt/JwtToken";




class CartController {


  async create(req: Request<'', '', CartTypeToCreate>, res: Response) {

    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }


    //CRIANDO O CARRINHO
        const cart = new CartService(new CartRepository()).executeCreate(
            {
                ownerId: id,
                products: req.body.products
            }
        )
        if (!cart) {
            return new InternalError("Internal Server Error!", res).returnError();
        }

        return new ResponseToCreated(cart).res(res);

  }


  async update(req: Request<'', '', Cart>, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }


    //ATUALIZANDO O CARRINHO
        const cart = new CartService(new CartRepository()).executeUpdate({
            id: req.body.id,
            ownerId: id,
            products: req.body.products            
        })
        if (!cart) {
            return new BadRequest("Something Is Wrong!", res).returnError();
        }

        return new ResponseGet(cart).res(res);
  }



  async get(req: Request, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }


    //BUSCANDO O CARRINHO
        const cart = new CartService(new CartRepository()).executeGet(id)
        if (!cart) {
            return new BadRequest("Something Is Wrong!", res).returnError();
        }

        return new ResponseGet(cart).res(res);
  }



  async delete(req: Request, res: Response) {
    
    //PEGANDO O ID DO CRIADOR QUE VEM NO TOKEN
        const id = new JwtMiddleware(req.headers.authorization ?? '').GetIdByToken();
        if(!id){
            return new Unauthorized('Token Is Required!',res).returnError()
        }


    //DELETANDO O CARRINHO
        const cart = new CartService(new CartRepository()).executeDelete(id)
        if (!cart) {
            return new BadRequest("Something Is Wrong!", res).returnError();
        }

        return 
  }


}

export { CartController };
