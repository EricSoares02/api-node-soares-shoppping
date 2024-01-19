import { Product } from "./IProduct";

export type DefaultCartType = {
    id: string;
    ownerId: string;
    product_ids: string[];
    quatity_Product: number[];
}



export interface ICartRepositories {
    create(
        ownerId: string,
        product_ids: string[]
    ): Promise<DefaultCartType>;
  
    getCart(id: string): Promise<DefaultCartType>;

    insertProduct(id: string, product_ids: string[], quatity_Product: number[]): Promise<DefaultCartType>;
  
    getProductsByCart(id: string, ): Promise<Product[]>;

    removeProduct(
        ownerId: string,
        product_ids: string[],
        quatity_Product: number[]
        ): Promise<DefaultCartType>;
  }