import { Product } from "../../interfaces/IProduct"
import { VerifyCategory } from "./verifyCategory"

class ProductCore{

public async verifyStore(storeId:string){


    

}


public async verifyCategories(Product: Product){

   const verify = new VerifyCategory(Product)

    verify.validationCategoryAndSubCategory


}

}

export {ProductCore}