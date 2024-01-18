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


}

export { CartCore }