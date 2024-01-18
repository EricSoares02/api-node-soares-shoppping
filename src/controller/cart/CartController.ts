import { NextFunction, Request, Response } from "express";
import { DefaultCartType } from "../../interfaces/ICart";
import { CartCore } from "../../core/cart/cartCore";
import { BadRequest, InternalError } from "../../middleware/errors.express";
import { CartService } from "../../services/cart/CartService";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { ResponseToCreated } from "../../middleware/Response.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";

const PostCartSchema = z.object({
  ownerId: z.string().min(24),
  product_ids: z.string().min(24).optional(),
});

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
}

export { CartController };
