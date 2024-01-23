import { NextFunction, Request, Response } from "express";
import {
  DefaultCartType,
  InsertIntemInCartParams,
  ProductInCart,
} from "../../interfaces/ICart";
import { CartCore } from "../../core/cart/cartCore";
import {
  BadRequest,
  InternalError,
  Unauthorized,
} from "../../middleware/errors.express";
import { CartService } from "../../services/cart/CartService";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { ResponseToCreated } from "../../middleware/Response.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { GetIdByJwtToken } from "../../middleware/getIdByToken.Jwt";

const PostCartSchema = z.object({
  ownerId: z.string().min(24),
  products: z
    .array(
      z.object({
        id: z.string().min(24),
        name: z.string(),
        url_img: z.string().url(),
        price_in_cent: z.number().nonnegative(),
        options: z.string(),
        storeId: z.string().min(24),
        quantity: z.number().nonnegative(),
      })
    )
    .optional(),
});

const InsertProductInCartSchema = z.string().min(24);

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

    const Products = req.body.products as ProductInCart[];

    const created = await new CartService(
      new CartRepository()
    ).executeCreateCartRepository(req.body.ownerId, Products);
    if (!created) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(created).res(res);
  }

  public async validationInsertProductCart(
    req: Request<InsertIntemInCartParams>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.params.id };
    ValidationData(InsertProductInCartSchema, data, next);
  }

  public async insertProductInCart(
    req: Request<InsertIntemInCartParams, "", ProductInCart>,
    res: Response
  ) {
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const id = await GetIdByJwtToken(token);
    if (id === null) {
      return new Unauthorized("token is required", res).returnError();
    }

    const GetProduct = await new CartCore().getProduct(req.params.id);

    if (!GetProduct) {
      return new InternalError("Internal Server Error", res).returnError();
    }

    // verificando se o carrinho existe e se é do msm dono
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(id);

    const Products = UserCart.products as Array<ProductInCart>;

    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    } else if (Products.length === 30) {
      return new BadRequest("full cart", res).returnError();
    }


    const { id: ProductId, name, price_in_cent, storeId, url_img } = GetProduct;


    // primeiro verificamos se o produto já existe no carrinho
    const productExist = Products.filter(
      (product) => product.id === req.params.id
    );

    // se o produto já existe, só aumentamos a quantidade... os index têm qeu ser iguais
    if (productExist.length > 0) {
      Products.map((product, index) => {
        if (
          product.id === req.params.id &&
          product.options === req.body.options
        ) {
          return (Products[index].quantity = Products[index].quantity + 1);
        }
        
        const img = url_img[0];
        const { options } = req.body;
        return Products.push({
          id: ProductId,
          name,
          price_in_cent,
          storeId,
          url_img: img,
          options,
          quantity: 1,
        });
      });
    } else {
      // inserindo os novos dados no user cart
     
      const img = url_img[0];
      const { options } = req.body;
      Products.push({
        id: ProductId,
        name,
        price_in_cent,
        storeId,
        url_img: img,
        options,
        quantity: 1,
      });
    }

    const created = await new CartService(
      new CartRepository()
    ).executeInsertProductInCartRepository(UserCart.id, Products);
    if (!created) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(created).res(res);
  }

  // public async validationRemoveProductCart(
  //   req: Request<"", "", DefaultCartType>,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   const data = { data: req.body.products };
  //   ValidationData(UpdateCartSchema, data, next);
  // }

  // public async removeProductToCart(
  //   req: Request<"", "", DefaultCartType>,
  //   res: Response
  // ) {
  //   const token = await new CartCore().decodedToken(
  //     req.headers.authorization ?? ""
  //   );
  //   const id = await GetIdByJwtToken(token);
  //   if (id === null) {
  //     return new Unauthorized("token is required", res).returnError();
  //   }

  //   // verificando se o carrinho existe e se é do msm dono
  //   const UserCart = await new CartService(
  //     new CartRepository()
  //   ).executeGetCartByUserRepository(id);
  //   if (UserCart.id === "") {
  //     return new BadRequest("This cart not exist", res).returnError();
  //   }

  //   // primeiro verificamos se o produto realmente existe no carrinho
  //   const productExist = UserCart.product_ids.filter(
  //     (product) => product === req.body.product_ids[0]
  //   );

  //   // se o produto já existe, só aumentamos a quantidade... os index têm qeu ser iguais
  //   if (productExist.length > 0) {
  //     UserCart.product_ids.map((product, index) => {
  //       if (product === req.body.product_ids[0]) {
  //         if (UserCart.quatity_Product[index] === 1) {
  //           return (
  //             UserCart.quatity_Product.splice(index, 1),
  //             UserCart.product_ids.splice(index, 1)
  //           );
  //         }
  //         return (UserCart.quatity_Product[index] =
  //           UserCart.quatity_Product[index] - 1);
  //       }
  //     });
  //   } else {
  //     return new BadRequest(
  //       "This product not exist in cart",
  //       res
  //     ).returnError();
  //   }

  //   const updated = await new CartService(
  //     new CartRepository()
  //   ).executeUpdateCartRepository(
  //     id,
  //     UserCart.product_ids,
  //     UserCart.quatity_Product
  //   );

  //   if (!updated) {
  //     return new InternalError("Internal Server Error", res).returnError();
  //   }
  //   return new ResponseToCreated(updated).res(res);
  // }

  // public async getProductsByCart(req: Request, res: Response) {
  //   const token = await new CartCore().decodedToken(
  //     req.headers.authorization ?? ""
  //   );
  //   const id = await GetIdByJwtToken(token);
  //   if (id === null) {
  //     return new Unauthorized("token is required", res).returnError();
  //   }

  //   // verificando se o carrinho existe e se é do msm dono
  //   const UserCart = await new CartService(
  //     new CartRepository()
  //   ).executeGetCartByUserRepository(id);
  //   if (UserCart.id === "") {
  //     return new BadRequest("This cart not exist", res).returnError();
  //   }

  //   const Products = await new CartService(
  //     new CartRepository()
  //   ).executeGetProductsByCartRepository(UserCart.id);

  //   if (!Products) {
  //     return new BadRequest("Cart no product", res).returnError();
  //   } else {
  //     return new ResponseGet(Products).res(res);
  //   }
  // }
}

export { CartController };
