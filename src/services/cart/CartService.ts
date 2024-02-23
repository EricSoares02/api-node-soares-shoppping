import { CartCore } from "../../core/cart/CartCore";
import { Cart, CartTypeToCreate, CartTypeToGet } from "../../interfaces/cart/cart";
import { DefaultServicesResponse } from "../../middleware/response.services";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { UserRepository } from "../../repositories/user/UserRepository";
import { UserService } from "../user/UserService";

class CartService {

  private CartRepository
  constructor(CartRepository: CartRepository) {
    this.CartRepository = CartRepository
  }


  async executeCreate(data: CartTypeToCreate): Promise<DefaultServicesResponse<CartTypeToGet>>{


    //VALIDANDO DADOS 
        if (!await new CartCore().validationDataToCreate(data)) {
            return {
                status: 1001,
                data: null
            }
        }



    //VERIFICANDO SE O USER EXISTE E SE O CARRINHO TAMBÉM
        const user = await new UserService(new UserRepository()).executeGet(data.ownerId)
        if (!user.data) {
            return {
                status: 404,
                data: null
            }
        }    

        const cart = await this.executeGet(user.data.id ?? '')
        if(cart.data){
            return {
                status: 400,
                data: null
            }
        }


    //CRIANDO CARRINHO

        const create = await this.CartRepository.create(data)
        return {
            data: create
        }

  }


  async executeUpdate(data: Cart): Promise<DefaultServicesResponse<CartTypeToGet>>{


    //VALIDANDO DADOS 
        if (!await new CartCore().validationDataToUpdate(data)) {
            return {
                status: 1001,
                data: null
            }
        }



    //VERIFICANDO SE O USER EXISTE E SE O CARRINHO TAMBÉM
        const user = await new UserService(new UserRepository()).executeGet(data.ownerId)
        if (!user.data) {
            return {
                status: 403,
                data: null
            }
        }    

        const cart = await this.executeGet(user.data.id ?? '')
        if(!cart.data){
            return {
                status: 400,
                data: null
            }
        }


    //ATUALIZANDO CARRINHO
        const update = await this.CartRepository.update(data)
        return {
            data: update
        }


  }



  async executeGet(ownerId: string): Promise<DefaultServicesResponse<CartTypeToGet>>{
 

    //VALIDANDO ID
        if (!await new CartCore().validationId(ownerId)) {
            return {
                status: 1001,
                data: null
            }
        }

    //BUSCANDO
        const cart = await this.CartRepository.get(ownerId)
        return {
            data: cart
        }

  }



  async executeDelete(ownerId: string): Promise<DefaultServicesResponse<void>>{


    //VALIDANDO ID
        if (!await new CartCore().validationId(ownerId)) {
            return {
                status: 1001,
                data: null
            }
        }

    //VERIFICANDO SE O CART EXISTE
        const cart = await this.executeGet(ownerId)
        if (!cart.data) {
            return {
                status: 404,
                data: null
            }
        }

    //O CART SÓ PODE SER DELETADO SE O USER FOR DELETADO PRIMEIRO 
        const user = await new UserService(new UserRepository()).executeGet(ownerId)
        if (user.data) {
            return {
                status: 400,
                data: null
            }
        }


    const remove = await this.CartRepository.delete(ownerId)
    return {
        data: remove
    }

  }

  
}
export { CartService };
