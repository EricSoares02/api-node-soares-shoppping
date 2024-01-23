import { JsonValue } from "@prisma/client/runtime/library";

export type ProductInCart = {
  id: string;
  name: string;
  url_img: string;
  price_in_cent: number;
  options: string;
  storeId: string;
  quantity: number;
};
export type DefaultCartType = {
  id: string;
  ownerId: string;
  products: JsonValue
};

export interface InsertIntemInCartParams{
  id: string
}


export interface ICartRepositories {
  create(ownerId: string, products?: Array<ProductInCart>): Promise<DefaultCartType>;

  getCart(id: string): Promise<DefaultCartType>;

  insertProduct(
    id: string,
    products: Array<ProductInCart>
  ): Promise<DefaultCartType>;

  //getProductsByCart(id: string): Promise<ProductInCart[]>;

  removeProduct(
    ownerId: string,
    products: Array<ProductInCart>
  ): Promise<DefaultCartType>;
}
