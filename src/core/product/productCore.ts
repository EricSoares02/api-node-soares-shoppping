import { Product } from "../../interfaces/IProduct"
import { StoreRepository } from "../../repositories/store/CreateStoreRepository"
import { StoreService } from "../../services/store/createStoreService"
import { VerifyCategory } from "./verifyCategory"

class ProductCore{

public async StoreExist(storeId:string){

const storeService = new StoreService(new StoreRepository)

if ((await storeService.executeGetStoreById(storeId)).id !== "") {
    return true
}
return false
}


public async verifyCategories(Product: Product){

   const verify = new VerifyCategory(Product)

    verify.validationCategoryAndSubCategory


}

}

export {ProductCore}