import { connect, diconnect } from "../../database/database";
import { Cart, CartTypeToCreate, CartTypeToGet } from "../../interfaces/cart/cart";
import { ICartRepository } from "../../interfaces/cart/cart.repository";
import { prisma } from "../../services/prisma/prisma";


class CartRepository implements ICartRepository {

    async create(data: CartTypeToCreate): Promise<CartTypeToGet> {
        connect();
        const create = await prisma.cart
        .create({
            data
        })
        .finally(diconnect);

        return create
    }


    async update(data: Cart): Promise<CartTypeToGet> {
        connect();
        const update = await prisma.cart
        .update({
            where: { ownerId: data.ownerId },
            data
        })
       .finally(diconnect);

        return update
    }



    async get(ownerId: string): Promise<CartTypeToGet | null> {
        connect();
        const cart = await prisma.cart
        .findFirst({
            where: { ownerId },
        })
       .finally(diconnect);

        return cart

    }


    async delete(ownerId: string): Promise<void> {
        connect();
        const cart = await prisma.cart
        .delete({
            where: { ownerId },
        })
       .finally(diconnect);
        cart
        return 
    }






 /* public async insertProduct(id: string,products: Array<ProductInCart>): Promise<DefaultCartType> {
    connect();
    const Cart = await prisma.cart
      .update({
        where: {
          id,
        },
        data: {
          products
        },
      })
      .finally(diconnect);

    if (Cart) {
      return Cart;
    }

    return {
      id: "",
      ownerId: "",
      products: []
    };
  }


  public async getCartByUser(ownerId: string): Promise<DefaultCartType> {
    const Cart = await prisma.cart
      .findFirst({
        where: {
          ownerId,
        },
      })
      .finally(diconnect);

    if (Cart) {
      return Cart;
    }

    return {
      id: "",
      ownerId: "",
      products: []
    };
  }

  public async removeProduct(
    id: string,
    products: Array<ProductInCart>
  ): Promise<DefaultCartType> {
    connect();
    const Cart = await prisma.cart
      .update({
        where: {
          id,
        },
        data: {
        products
        },
      })
      .finally(diconnect);

    if (Cart) {
      return Cart;
    }

    return {
      id: "",
      ownerId: "",
      products: []
    };
  }
 **/
  
}

export { CartRepository };
