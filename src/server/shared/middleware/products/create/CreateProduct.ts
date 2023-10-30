import { Response } from "express";
import { IProduto } from "../../../model/product/Produto";
import { CategoryMidlleware } from "./subCategoryValidation";
import { ProductValidation } from "./ProductValidation";
import { VerifyStore } from "./VerifyStore";
import { createProductService } from "../../../services/produtos/createProduct";





export function CreateProductMiddleware(res: Response, data: IProduto) {
 
  
    ProductValidation(data)
    const datavalidation = new CategoryMidlleware(data.category, data.subCategory, res);
    datavalidation.validationCategoryAndSubCategory();
    VerifyStore(data.store.cnpj, res);

    createProductService(res, data)
  
}
