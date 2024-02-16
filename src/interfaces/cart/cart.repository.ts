import { Cart, CartTypeToCreate, CartTypeToGet } from "./cart";




export interface ICartRepository {


    create(data: CartTypeToCreate): Promise<CartTypeToGet>;
  
    update(data: Cart): Promise<CartTypeToGet>

    get(ownerId: string): Promise<CartTypeToGet | null>;
  
    delete(ownerId: string): Promise<void>
    

    // insertProduct(
    //   id: string,
    //   products: Array<ProductInCart>
    // ): Promise<DefaultCartType>;
  
    // //getProductsByCart(id: string): Promise<ProductInCart[]>;
  
    // removeProduct(
    //   ownerId: string,
    //   products: Array<ProductInCart>
    // ): Promise<DefaultCartType>;
  }