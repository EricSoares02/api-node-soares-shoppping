import { Product } from "./IProduct";

export type DefaultCartType = {
    id: string;
    ownerId: string;
    product_ids: string[];
}



export interface ICartRepositories {
    create(
        ownerId: string,
        product_ids: string[]
    ): Promise<DefaultCartType>;
  
    getCart(id: string): Promise<DefaultCartType>;

    insertProduct(id: string, product_ids: string[]): Promise<DefaultCartType>;
  

    getProductsByCart(id: string, ): Promise<Product[]>;
  }