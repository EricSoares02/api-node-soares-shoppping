import { Product } from "../../interfaces/IProduct";
import { DecodedTokenJwt } from "../../middleware/decodedToken.Jwt";
import { ProductRepository } from "../../repositories/product/ProductRepository";
import { StoreRepository } from "../../repositories/store/CreateStoreRepository";
import { UserRepository } from "../../repositories/user/UserRepository";
import { ProductService } from "../../services/product/ProductService";
import { StoreService } from "../../services/store/createStoreService";
import { UserService } from "../../services/user/UserService";
import { VerifyCategory } from "./verifyCategory";
import Jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

class ProductCore {
  public async StoreExist(storeId: string) {
    const storeService = new StoreService(new StoreRepository());

    if ((await storeService.executeGetStoreById(storeId)).id !== "") {
      return true;
    }
    return false;
  }

  public async verifyCategories(Product: Product) {
    const verify = new VerifyCategory(Product);

    verify.validationCategoryAndSubCategory;
  }

  public async verifyProduct(id: string) {
    const verify = await new ProductService(
      new ProductRepository()
    ).executeGetByIdProductRepository(id);

    if (verify.id != "") {
      return true;
    }

    return false;
  }

  //o user que tenta cadastrar o produto, precisa ser da msm loja que está cadastrando o produto, e tbm precisa ser um adm, ou um master ou elder
  public async verifyUserStore(product: Product, authorization?: string){

   const token = DecodedTokenJwt(authorization);
   if(token===''){
    return false
   }
   
  const {id} = Jwt.decode(token) as JwtPayload;
  const user = await new UserService(new UserRepository()).executeGetByIdUserRepository(id)
   if(!user){
    return false
   }


  if((user.storeId !== product.storeId) || user.storeId === undefined){
    return false
  }

  return true

  }


}

export { ProductCore };
