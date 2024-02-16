import { JsonValue } from "@prisma/client/runtime/library";



type ProductInCart = {
  id: string;
  name: string;
  options: string;
  // storeId: string;
  quantity: number;
  // categoryId: string;
  // subCategoryId: string;
  // desc: string;
  price: number;
  photos: string;
}


type CartTypeToCreate = {
  ownerId: string,
  products: ProductInCart[] 
}

type CartTypeToGet = {
  id: string
  ownerId: string
  products: JsonValue
}


type CartType = {
  id: string,
  ownerId: string,
  products: ProductInCart[]
}


class Cart implements CartType {

  id: string;
  ownerId: string;
  products: ProductInCart[];

  constructor(data: CartType){
    this.id = data.id
    this.ownerId = data.ownerId
    this.products = data.products
  }
}



export { Cart, CartTypeToCreate, CartTypeToGet }