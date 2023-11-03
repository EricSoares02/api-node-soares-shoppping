import { Response } from "express";
import { IProduto } from "../../../model/product/Produto";
import { CategoryMidlleware } from "./subCategoryValidation";
import { ProductValidation } from "./ProductValidation";
import { VerifyStore } from "./VerifyStore";


export function CreateProductMiddleware(res: Response, data: IProduto, storeId:string) {
 
    
   
    ProductValidation(data)
    const datavalidation = new CategoryMidlleware(data.category, data.subCategory, res);
    datavalidation.validationCategoryAndSubCategory();
    VerifyStore(data, res, storeId)
      

}
