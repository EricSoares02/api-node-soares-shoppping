import { JsonValue } from "@prisma/client/runtime/library";




type ProductCategoryType = {
    name: string,
    subCategory: string
}

type ProductType = {
  id: string;
  name: string;
  photos: string[];
  price: number;
  options: any
  desc: string;
  storeId: string;
  category: ProductCategoryType
};

type ProductGetType = {
    id: string;
    name: string;
    photos: string[];
    price: number;
    options: JsonValue;
    desc: string;
    storeId: string;
    category: JsonValue
  };



class Product implements ProductType {

  category: ProductCategoryType;
  desc: string;
  id: string;
  name: string;
  options: any;
  price: number;
  storeId: string;
  photos: string[];

  constructor(data: ProductType){
    this.category = data.category
    this.desc = data.desc
    this.id = data.id
    this.name = data.name
    this.photos = data.photos
    this.storeId = data.storeId
    this.options = data.options
    this.price = data.price
  }


}





export { Product, ProductGetType, ProductCategoryType }