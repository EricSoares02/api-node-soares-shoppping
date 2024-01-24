import { connect, diconnect } from "../../database/database";
import {
  DefaultCartType,
  ICartRepositories,
  ProductInCart,
} from "../../interfaces/ICart";
import { prisma } from "../../services/prisma/prisma";


class CartRepository implements ICartRepositories {
  public async create(
    ownerId: string,
    products?: Array<ProductInCart>
  ): Promise<DefaultCartType> {
    connect();
    const createCart = await prisma.cart
      .create({
        data: {
          ownerId,
          products,
        },
      })
      .finally(diconnect);

    return createCart;
  }

  public async getCart(id: string): Promise<DefaultCartType> {
    connect();
    const getCart = await prisma.cart
      .findUnique({
        where: { id },
      })
      .finally(diconnect);

    if (getCart) {
      return getCart;
    }

    return {
      id: "",
      ownerId: "",
      products: []
    };
  }

  public async insertProduct(
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
}

export { CartRepository };
