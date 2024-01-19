import { NextFunction, Request, Response } from "express";
import { DefaultCartType } from "../../interfaces/ICart";
import { CartCore } from "../../core/cart/cartCore";
import {
  BadRequest,
  InternalError,
  Unauthorized,
} from "../../middleware/errors.express";
import { CartService } from "../../services/cart/CartService";
import { CartRepository } from "../../repositories/cart/CartRepository";
import {
  ResponseGet,
  ResponseToCreated,
} from "../../middleware/Response.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { GetIdByJwtToken } from "../../middleware/getIdByToken.Jwt";

const PostCartSchema = z.object({
  ownerId: z.string().min(24),
  product_ids: z.array(z.string().min(24)),
  quatity_Product: z.array(z.number().nonnegative()),
});

const UpdateCartSchema = z.array(z.string().min(24));

const PostProductInCartSchema = z.array(z.string().min(24));

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

  public async insertProductInCart(
    req: Request<"", "", DefaultCartType>,
    res: Response
  ) {
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const id = await GetIdByJwtToken(token);
    if (id === null) {
      return new Unauthorized("token is required", res).returnError();
    }

    // verificando se o carrinho existe e se é do msm dono
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(id);
    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    } else if (UserCart.product_ids.length === 30) {
      return new BadRequest("full cart", res).returnError();
    }

    // primeiro verificamos se o produto já existe no carrinho
    const productExist = UserCart.product_ids.filter(
      (product) => product === req.body.product_ids[0]
    );

    // se o produto já existe, só aumentamos a quantidade... os index têm qeu ser iguais
    if (productExist.length > 0) {
      UserCart.product_ids.map((product, index) => {
        if (product === req.body.product_ids[0]) {
          return (UserCart.quatity_Product[index] =
            UserCart.quatity_Product[index] + 1);
        }
      });
    } else {
      // inserindo os novos dados no user cart
      req.body.product_ids.map((product) => {
        return (
          UserCart.product_ids.push(product), UserCart.quatity_Product.push(1)
        );
      });
    }

    const created = await new CartService(
      new CartRepository()
    ).executeInsertProductInCartRepository(
      UserCart.id,
      UserCart.product_ids,
      UserCart.quatity_Product
    );
    if (!created) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(created).res(res);
  }

  public async validationRemoveProductCart(
    req: Request<"", "", DefaultCartType>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body.product_ids };
    ValidationData(UpdateCartSchema, data, next);
  }

  public async removeProductToCart(
    req: Request<"", "", DefaultCartType>,
    res: Response
  ) {
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const id = await GetIdByJwtToken(token);
    if (id === null) {
      return new Unauthorized("token is required", res).returnError();
    }

    // verificando se o carrinho existe e se é do msm dono
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(id);
    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    }

    // primeiro verificamos se o produto realmente existe no carrinho
    const productExist = UserCart.product_ids.filter(
      (product) => product === req.body.product_ids[0]
    );

    // se o produto já existe, só aumentamos a quantidade... os index têm qeu ser iguais
    if (productExist.length > 0) {
      UserCart.product_ids.map((product, index) => {
        if (product === req.body.product_ids[0]) {
          if (UserCart.quatity_Product[index] === 1) {
            return (
              UserCart.quatity_Product.splice(index, 1),
              UserCart.product_ids.splice(index, 1)
            );
          }
          return (UserCart.quatity_Product[index] =
            UserCart.quatity_Product[index] - 1);
        }
      });
    } else {
      return new BadRequest(
        "This product not exist in cart",
        res
      ).returnError();
    }

    const updated = await new CartService(
      new CartRepository()
    ).executeUpdateCartRepository(
      id,
      UserCart.product_ids,
      UserCart.quatity_Product
    );

    if (!updated) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(updated).res(res);
  }

  public async getProductsByCart(req: Request, res: Response) {
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const id = await GetIdByJwtToken(token);
    if (id === null) {
      return new Unauthorized("token is required", res).returnError();
    }

    // verificando se o carrinho existe e se é do msm dono
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(id);
    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    }

    const Products = await new CartService(
      new CartRepository()
    ).executeGetProductsByCartRepository(UserCart.id);

    if (!Products) {
      return new BadRequest("Cart no product", res).returnError();
    } else {
      return new ResponseGet(Products).res(res);
    }
  }
}

export { CartController };
