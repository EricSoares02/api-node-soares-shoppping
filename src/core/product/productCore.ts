import { Response } from "express";
import { CreateProductType, ProductOptions } from "../../interfaces/IProduct";
import { DecodedTokenJwt } from "../../middleware/decodedToken.Jwt";
import { ProductRepository } from "../../repositories/product/ProductRepository";
import { StoreRepository } from "../../repositories/store/CreateStoreRepository";
import { UserRepository } from "../../repositories/user/UserRepository";
import { ProductService } from "../../services/product/ProductService";
import { StoreService } from "../../services/store/createStoreService";
import { UserService } from "../../services/user/UserService";
import { VerifyCategory } from "./verifyCategory";
import { verifyOptions } from "./verifyOptions";




class ProductCore {
  public async StoreExist(storeId: string) {
    const storeService = new StoreService(new StoreRepository());

    if ((await storeService.executeGetStoreById(storeId)).id !== "") {
      return true;
    }
    return false;
  }

  public async verifyCategories(Product: CreateProductType, res: Response) {
    const verify = new VerifyCategory(Product);

   await verify.validationCategoryAndSubCategory(res);
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


  public async decodedToken(token: string){

    const hashToken = DecodedTokenJwt(token);
    return hashToken
   
  }


  public async verifyUserStore(id: string, storeId: string) {
    

    const user = await new UserService(new UserRepository).executeGetByIdUserRepository(id);

    if (user.storeId === storeId && user.role !== 'user') {
      return true
    }

    return false

  }

   public async getStoreId(id: string) {
    
    return await new UserService(new UserRepository()).executeGetByIdUserRepository(id);

   }

   public async verifyOptions( options: ProductOptions, prop: {
    category: string,
    subCategory: string}, res: Response) {
    
    await new verifyOptions(options, {category:prop.category, subCategory: prop.subCategory}).validationOptions(res);
   }
}

export { ProductCore };
