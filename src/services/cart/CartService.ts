import { ProductInCart } from "../../interfaces/ICart";
import { CartRepository } from "../../repositories/cart/CartRepository";

class CartService {
  constructor(private CartRepository: CartRepository) {}

  public async executeCreateCartRepository(ownerId: string, products?: Array<ProductInCart>) {
    const created = await this.CartRepository.create(ownerId, products);

    return created;
  }

  public async executeGetCartRepository(id: string) {
    const commentsByProduct = await this.CartRepository.getCart(
   id
    );

    return commentsByProduct;
  }

  // public async executeGetProductsByCartRepository(CartId: string) {
  //   const commentsByUser = await this.CartRepository.getProductsByCart(CartId);

  //   return commentsByUser;
  // }

  public async executeInsertProductInCartRepository(id: string, products: Array<ProductInCart>) {
    const created = await this.CartRepository.insertProduct(id, products);

    return created;
  }

  public async executeGetCartByUserRepository(ownerId: string) {
    const created = await this.CartRepository.getCartByUser(ownerId);

    return created;
  }


  public async executeUpdateCartRepository(ownerId: string, products: Array<ProductInCart>) {
    const created = await this.CartRepository.removeProduct(ownerId, products);

    return created;
  }
}
export { CartService };
