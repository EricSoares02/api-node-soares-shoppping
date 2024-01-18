import { NextFunction, Request, Response } from "express";
import { DefaultCartType } from "../../interfaces/ICart";
import { CartCore } from "../../core/cart/cartCore";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { CartService } from "../../services/cart/CartService";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { ResponseToCreated } from "../../middleware/Response.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { GetIdByJwtToken } from "../../middleware/getIdByToken.Jwt";

const PostCartSchema = z.object({
  ownerId: z.string().min(24),
  product_ids: z.array(z.string().min(24)).optional(),
});

const PostProductInCartSchema =  z.array(z.string().min(24));
 


class CartController {

  public async validationPostCart(
    req: Request<"", "", DefaultCartType>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(PostCartSchema, data, next);
  }

  public async create(req: Request<"", "", DefaultCartType>, res: Response) {
    //verificando se o user já tem um carrinho
    const CartExist = await new CartCore().verifyCart(req.body.ownerId);
    if (CartExist) {
      return new BadRequest("This cart exist", res).returnError();
    }

    const created = await new CartService(
      new CartRepository()
    ).executeCreateCartRepository(req.body.ownerId, req.body.product_ids);
    if (!created) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(created).res(res);
  }


  public async validationInsertProductCart(
    req: Request<"", "", DefaultCartType>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body.product_ids };
    ValidationData(PostProductInCartSchema, data, next);
  }

  public async insertProductInCart(req: Request<"", "", DefaultCartType>, res: Response) {
    

    const token = await new CartCore().decodedToken(
        req.headers.authorization ?? ""
        );  
    const id = await GetIdByJwtToken(token);
    if (id === null) {
        return new Unauthorized('token is required', res).returnError();
    }


    // verificando se o carrinho existe e se é do msm dono 
    const UserCart = await new CartService(new CartRepository()).executeGetCartByUserRepository(id);
    if (UserCart.id === '') {
      return new BadRequest("This cart not exist", res).returnError();
    } else if (UserCart.product_ids.length === 30) {
        return new BadRequest("full cart", res).returnError();
      }


    // inserindo os novos dados no user cart
      req.body.product_ids.map((product)=>{
        return UserCart.product_ids.push(product)
    });  



    const created = await new CartService(
        new CartRepository()
      ).executeInsertProductInCartRepository(UserCart.id, UserCart.product_ids);
      if (!created) {
        return new InternalError("Internal Server Error", res).returnError();
      }
      return new ResponseToCreated(created).res(res);
  }

}

export { CartController };
