import { CartCore } from "../../core/cart/CartCore";
import { Cart, CartTypeToCreate } from "../../interfaces/cart/cart";
import { CartRepository } from "../../repositories/cart/CartRepository";
import { UserRepository } from "../../repositories/user/UserRepository";
import { UserService } from "../user/UserService";

class CartService {

  private CartRepository
  constructor(CartRepository: CartRepository) {
    this.CartRepository = CartRepository
  }


  async executeCreate(data: CartTypeToCreate){


    //VALIDANDO DADOS 
        if (!await new CartCore().validationDataToCreate(data)) {
            return null
        }



    //VERIFICANDO SE O USER EXISTE E SE O CARRINHO TAMBÉM
        const user = await new UserService(new UserRepository()).executeGet(data.ownerId)
        if (!user) {
            return null
        }    


        if(await this.executeGet(user.id ?? '')){
            return null
        }


    //CRIANDO CARRINHO

        const create = await this.CartRepository.create(data)
        return create

  }


  async executeUpdate(data: Cart){


    //VALIDANDO DADOS 
        if (!await new CartCore().validationDataToUpdate(data)) {
            return null
        }



    //VERIFICANDO SE O USER EXISTE E SE O CARRINHO TAMBÉM
        const user = await new UserService(new UserRepository()).executeGet(data.ownerId)
        if (!user) {
            return null
        }    


        if(!await this.executeGet(user.id ?? '')){
            return null
        }


    //ATUALIZANDO CARRINHO
        const update = await this.CartRepository.update(data)
        return update


  }



  async executeGet(ownerId: string){
 

    //VALIDANDO ID
        if (!await new CartCore().validationId(ownerId)) {
            return null
        }

    //BUSCANDO
        const cart = await this.CartRepository.get(ownerId)
        return cart

  }



  async executeDelete(ownerId: string){


    //VALIDANDO ID
        if (!await new CartCore().validationId(ownerId)) {
            return null
        }

    //VERIFICANDO SE O CART EXISTE
        if (!await this.executeGet(ownerId)) {
            return null
        }

    //O CART SÓ PODE SER DELETADO SE O USER FOR DELETADO PRIMEIRO 
        if (await new UserService(new UserRepository()).executeGet(ownerId)) {
            return null
        }


    const cart = await this.CartRepository.delete(ownerId)
    return cart

  }

  
}
export { CartService };
