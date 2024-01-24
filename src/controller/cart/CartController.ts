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
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
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

const ModifyProductInCartSchema = z.object({
  id: z.string().min(24),
  options: z.string().min(4),
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
    req: Request<InsertIntemInCartParams, "", ProductInCart>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(ModifyProductInCartSchema, data, next);
  }

  public async insertProductInCart(
    req: Request<InsertIntemInCartParams, "", ProductInCart>,
    res: Response
  ) {
//--------------------------PEGANDO O ID QUE VEM DENTRO DO TOKEN JWT QUE VEM NO HEADERS DA REQUISIÇÃO--------------------------------
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const UserId = await GetIdByJwtToken(token);
    if (UserId === null) {
      return new Unauthorized("token is required", res).returnError();
    }

//--------------------------PEGANDO O CARRINHO DO USER E VERIFICANDO SE ELE EXISTE E SE ESTÁ CHEIO--------------------------------
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(UserId);
    const Products = UserCart.products as Array<ProductInCart>;
    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    } else if (Products.length === 30) {
      return new BadRequest("full cart", res).returnError();
    }

//--------------------------BUSCANDO PRODUTO PARA VERIFICAR SE ELE EXISTE --------------------------------
    const GetProduct = await new CartCore().getProduct(req.body.id);
    if (!GetProduct) {
      return new InternalError("Internal Server Error", res).returnError();
    }

//--------------------------PEGANDO OS DADOS------------------------------------------------------------
    const { id, name, price_in_cent, storeId, url_img } = GetProduct;
    const { options } = req.body;
    const img = url_img[0];

//--------------------------VERIFICANDO SE O CARRINHO ESTÁ VAZIO-----------------------------------------
//--------------------------SE ESTIVER, SÓ ADICIONAMOS O NOVO ITEM---------------------------------------
    if (Products.length === 0) {
      console.log('aqui')
       Products.push({
        id,
        name,
        price_in_cent,
        storeId,
        url_img: img,
        options,
        quantity: 1,
      })
//--------------------------CASO O CARRINHO NÃOESTEJA VAZIO, FAZER AS SEGUINTES VERIFICAÇÕES--------------------
    } else {

//--------------------------FILTRAMOS OS PRODUTOS PARA VER SE O QUE A REQUISIÇÃO QUE INSERIR JÁ EXISTE--------------------  
      const productExist = Products.filter((product) => product.id === id && product.options === options);


//--------------------------SE CASO O ARRAY QUE FILTRAMOS TENHA O LENGTH MAIOR QUE 0, ESSE PRODUTO JÁ EXISTE NO CARRINHO-------------------- 
//--------------------------ENTÃO SÓ AUMENTAMOS SUA QUANTIDADE--------------------   
      if (productExist.length > 0) {
        for (let index = 0; index < Products.length; index++) {
          if (Products[index].id === id && Products[index].options === options) {
             Products[index].quantity = Products[index].quantity + 1;
             break;
          }       
        }

//--------------------------CASO NÃO EXISTA, SÓ ADICIONAMOS--------------------  
      } else {
        Products.push({
          id,
          name,
          price_in_cent,
          storeId,
          url_img: img,
          options,
          quantity: 1,
        });
      }   
      
    }

//--------------------------CHAMANDO SERVICE E FAZENDO AS ALTERAÇÕES--------------------      
    const created = await new CartService(
      new CartRepository()
    ).executeInsertProductInCartRepository(UserCart.id, Products);
    if (!created) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(created).res(res);  
  }

  public async validationLessProductCart(
    req: Request<InsertIntemInCartParams, "", ProductInCart>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(ModifyProductInCartSchema, data, next);
  }

  public async lessProductToCart(
    req: Request<InsertIntemInCartParams, "", ProductInCart>,
    res: Response
  ) {
    //--------------------------PEGANDO O ID DO USER QUE VEM DENTRO DO TOPKEN JWT--------------------------------
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const UserId = await GetIdByJwtToken(token);
    if (UserId === null) {
      return new Unauthorized("token is required", res).returnError();
    }

//--------------------------PEGANDO O CARRINHO DO USER E VERIFICANDO SE ELE EXISTE--------------------------------
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(UserId);
    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    }


//--------------------------PEGANDO OS DADOS--------------------------------
    const Products = UserCart.products as Array<ProductInCart>;
    const { id, options} = req.body


//--------------------------VERIFICANDO SE O PRODUTO EXISTE NO CARRINHO--------------------
    const productExist = Products.filter(
      (product) => product.id === id && product.options === options
    );
    if (productExist.length > 0) {

//--------------------------FAZENDO ALTERAÇÕES NO ARRAY--------------------
    for (let index = 0; index < Products.length; index++) {
      if (Products[index].id === id && Products[index].options === options) {

//--------------------------CASO A QUANTIDADE SEJA 1, REMOVEMOS O ITEM--------------------
          if (Products[index].quantity === 1) {
            Products.splice(index, 1)
            break;

//--------------------------CASO A QUANTIDADE SEJA MAIOR QUE 1, DIMINUIMOS A QUANTIDADE--------------------            
          } else {  
            Products[index].quantity = Products[index].quantity - 1;
             break;
          }
        }       
      }
    } else {
      return new BadRequest(
        "This product not exist in cart",
        res
      ).returnError();
    }

//--------------------------CHAMANDO SERVICE E FAZENDO AS ALTERAÇÕES--------------------   
    const updated = await new CartService(
      new CartRepository()
    ).executeUpdateCartRepository(UserCart.id, Products);
    if (!updated) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(updated).res(res);
  }

  public async getCart(req: Request, res: Response) {
//--------------------------PEGANDO O ID DO USER QUE VEM DENTRO DO TOPKEN JWT--------------------------------
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const id = await GetIdByJwtToken(token);
    if (id === null) {
      return new Unauthorized("token is required", res).returnError();
    }

//--------------------------VERIFICANDO SE O USER EXISTE--------------------------------
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(id);
    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    }

//--------------------------CHAMANDO SERVICE E REPASSANDO O CARRINHO--------------------------------
    const Products = await new CartService(
      new CartRepository()
    ).executeGetCartRepository(UserCart.id);
    if (!Products) {
      return new BadRequest("Cart no product", res).returnError();
    } else {
      return new ResponseGet(Products).res(res);
    }
  }


  public async validationRemoveProductCart(
    req: Request<InsertIntemInCartParams, "", ProductInCart>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(ModifyProductInCartSchema, data, next);
  }

  public async removeProductToCart(
    req: Request<InsertIntemInCartParams, "", ProductInCart>,
    res: Response
  ) {
    //--------------------------PEGANDO O ID DO USER QUE VEM DENTRO DO TOPKEN JWT--------------------------------
    const token = await new CartCore().decodedToken(
      req.headers.authorization ?? ""
    );
    const UserId = await GetIdByJwtToken(token);
    if (UserId === null) {
      return new Unauthorized("token is required", res).returnError();
    }

//--------------------------PEGANDO O CARRINHO DO USER E VERIFICANDO SE ELE EXISTE--------------------------------
    const UserCart = await new CartService(
      new CartRepository()
    ).executeGetCartByUserRepository(UserId);
    if (UserCart.id === "") {
      return new BadRequest("This cart not exist", res).returnError();
    }


//--------------------------PEGANDO OS DADOS--------------------------------
    const Products = UserCart.products as Array<ProductInCart>;
    const { id, options} = req.body


//--------------------------VERIFICANDO SE O PRODUTO EXISTE NO CARRINHO--------------------
    const productExist = Products.filter(
      (product) => product.id === id && product.options === options
    );
    if (productExist.length > 0) {

//--------------------------FAZENDO ALTERAÇÕES NO ARRAY--------------------
    for (let index = 0; index < Products.length; index++) {
      if (Products[index].id === id && Products[index].options === options) {

//--------------------------REMOVENDO O ITEM DO ARRAY--------------------
            Products.splice(index, 1)
            break;         
        }       
      }
    } else {
      return new BadRequest(
        "This product not exist in cart",
        res
      ).returnError();
    }

//--------------------------CHAMANDO SERVICE E FAZENDO AS ALTERAÇÕES--------------------   
    const updated = await new CartService(
      new CartRepository()
    ).executeUpdateCartRepository(UserCart.id, Products);
    if (!updated) {
      return new InternalError("Internal Server Error", res).returnError();
    }
    return new ResponseToCreated(updated).res(res);
  }

}

export { CartController };
