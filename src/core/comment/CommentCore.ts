import { DecodedTokenJwt } from "../../middleware/decodedToken.Jwt";
import { ProductRepository } from "../../repositories/product/ProductRepository";
import { UserRepository } from "../../repositories/user/UserRepository";
import { ProductService } from "../../services/product/ProductService";
import { UserService } from "../../services/user/UserService";

class CommentCore {
  public async verifyUserExist(authorId: string) {
    const user = await new UserService(
      new UserRepository()
    ).executeGetByIdUserRepository(authorId);

    if (user.id === undefined || user.id === '') {
      return false;
    }

    return true;
  }

  public async verifyProductExist(product_commentedId: string) {
    const product = await new ProductService(
      new ProductRepository()
    ).executeGetByIdProductRepository(product_commentedId);

    if (product.id === "" || product.id === undefined) {
      return false;
    }

    return true;
  }

  public async decodedToken(token: string) {

    const hashToken = DecodedTokenJwt(token);
    return hashToken

  }
}
export { CommentCore };
