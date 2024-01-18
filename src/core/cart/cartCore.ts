import { DecodedTokenJwt } from "../../middleware/decodedToken.Jwt";
import { CartRepository } from "../../repositories/cart/CartRepository"
import { CartService } from "../../services/cart/CartService"


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

}

export { CartCore }