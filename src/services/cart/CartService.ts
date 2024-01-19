import { CartRepository } from "../../repositories/cart/CartRepository";

class CartService {
  constructor(private CartRepository: CartRepository) {}

  public async executeCreateCartRepository(ownerId: string, product_ids: string[]) {
    const created = await this.CartRepository.create(ownerId, product_ids);

    return created;
  }

  public async executeGetCartRepository(id: string) {
    const commentsByProduct = await this.CartRepository.getCart(
   id
    );

    return commentsByProduct;
  }

  public async executeGetProductsByCartRepository(CartId: string) {
    const commentsByUser = await this.CartRepository.getProductsByCart(CartId);

    return commentsByUser;
  }

  public async executeInsertProductInCartRepository(id: string, product_ids: string[], quatity_Product: number[]) {
    const created = await this.CartRepository.insertProduct(id, product_ids, quatity_Product);

    return created;
  }

  public async executeGetCartByUserRepository(ownerId: string) {
    const created = await this.CartRepository.getCartByUser(ownerId);

    return created;
  }


  public async executeUpdateCartRepository(ownerId: string, product_ids: string[], quatity_Product: number[]) {
    const created = await this.CartRepository.removeProduct(ownerId, product_ids, quatity_Product);

    return created;
  }
}
export { CartService };
