import { JsonValue } from "@prisma/client/runtime/library";



type ProductType = {
  id: string;
  name: string;
  photos: string[];
  price: number;
  options: any
  desc: string;
  storeId: string;
  categoryId: string 
  subCategoryId: string
};


interface IProductParamsToCreate {
  name: string;
  photos: string[];
  price: number;
  options: any
  desc: string;
  storeId: string;
  categoryName: string 
  subCategoryName: string
}

interface IProductParamsToUpdate {
  id: string;
  name: string;
  photos: string[];
  price: number;
  options: any
  desc: string; 
  categoryName: string 
  subCategoryName: string
}


type ProductGetType = {
  id: string;
  name: string;
  photos: string[];
  price: number;
  options: JsonValue
  desc: string;
  storeId: string;
  categoryId: string 
  subCategoryId: string
  };



class Product implements ProductType {

  categoryId: string;
  subCategoryId: string;
  desc: string;
  id: string;
  name: string;
  options: any;
  price: number;
  storeId: string;
  photos: string[];

  constructor(data: ProductType){
    this.categoryId = data.categoryId
    this.subCategoryId = data.subCategoryId
    this.desc = data.desc
    this.id = data.id
    this.name = data.name
    this.photos = data.photos
    this.storeId = data.storeId
    this.options = data.options
    this.price = data.price
  }


}





export { Product, ProductGetType, IProductParamsToCreate, IProductParamsToUpdate }