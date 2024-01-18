import { connect, diconnect } from "../../database/database";
import { DefaultCartType, ICartRepositories } from "../../interfaces/ICart";
import { Product } from "../../interfaces/IProduct";
import { prisma } from "../../services/prisma/prisma";

class CartRepository implements ICartRepositories {
  public async create(
    ownerId: string,
    product_ids: string[]
  ): Promise<DefaultCartType> {
    connect();
    const createCart = await prisma.cart
      .create({
        data: {
          ownerId,
          product_ids,
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
      product_ids: [],
    };
  }

  public async insertProduct(
    id: string,
    product_ids: string[]
  ): Promise<DefaultCartType> {
    connect();
    const Cart = await prisma.cart
      .update({
        where: {
          id,
        },
        data: {
          product_ids,
        },
      })
      .finally(diconnect);

    if (Cart) {
      return Cart;
    }

    return {
      id: "",
      ownerId: "",
      product_ids: [],
    };
  }

  public async getProductsByCart(CartId: string): Promise<Product[]> {
    const Products = await prisma.product
      .findMany({
        where: {
          cart_ids: {
            hasSome: [CartId],
          },
        },
      })
      .finally(diconnect);

    if (Products) {
      return Products;
    }

    return [];
  }

  public async getCartByUser(ownerId: string): Promise<DefaultCartType> {
    const Cart = await prisma.cart
      .findUnique({
        where: {
          ownerId
        },
      })
      .finally(diconnect);

    if (Cart) {
      return Cart;
    }

    return {
        id: "",
        ownerId: "",
        product_ids: [],
      };
  }
}

export { CartRepository };
