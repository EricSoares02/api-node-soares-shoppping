import { DecodedTokenJwt } from "../../middleware/decodedToken.Jwt";
import { CartRepository } from "../../repositories/cart/CartRepository"
import { ProductRepository } from "../../repositories/product/ProductRepository";
import { CartService } from "../../services/cart/CartService"
import { ProductService } from "../../services/product/ProductService";


class CartCore {


    public async verifyCart(id: string) {
        
        const cart = await new CartService(new CartRepository).executeGetCartByUserRepository(id);

        if (cart.id !== '') {
            return true
        }
        return false
    }

    public async decodedToken(token: string){

        const hashToken = DecodedTokenJwt(token);
        return hashToken
    
      }

    
    public async getProduct(ProductId: string) {
        
        const Product = await new ProductService(new ProductRepository()).executeGetByIdProductRepository(ProductId);

        if (Product.id === '') {
            return false
        }
        return Product
    }

}

export { CartCore }