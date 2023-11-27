import { Product } from "../../interfaces/IProduct";
import { ProductRepository } from "../../repositories/product/ProductRepository";
import { StoreRepository } from "../../repositories/store/CreateStoreRepository";
import { ProductService } from "../../services/product/ProductService";
import { StoreService } from "../../services/store/createStoreService";
import { VerifyCategory } from "./verifyCategory";

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
}

export { ProductCore };
