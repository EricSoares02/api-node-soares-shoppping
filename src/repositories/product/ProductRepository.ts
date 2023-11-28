import { connect, diconnect } from "../../database/database";
import { Product, IProductRepositories } from "../../interfaces/IProduct";
import { prisma } from "../../services/prisma/prisma";

class ProductRepository implements IProductRepositories {
  public async create(
    name: string,
    url_img: string[],
    price_in_cent: number,
    category: string,
    subCategory: string,
    options: string[],
    storeId: string,
    desc: string | null
  ): Promise<Product> {
    connect();
    const createProduct = await prisma.product
      .create({
        data: {
          name,
          url_img,
          price_in_cent,
          category,
          subCategory,
          options,
          storeId,
          desc,
        },
      })
      .finally(diconnect);
    return createProduct;
  }

  public async getById(id: string): Promise<Product> {
    connect();
    const getProductById = await prisma.product
      .findUnique({
        where: { id },
      })
      .finally(diconnect);

    if (getProductById) {
      return getProductById;
    }

    return {
      id: "",
      name: "",
      url_img: [],
      price_in_cent: 0,
      category: "",
      subCategory: "",
      options: [],
      storeId: "",
      desc: "",
    };
  }

  public async getAll(): Promise<Product[]> {
    connect();
    const getAllProduct = await prisma.product.findMany().finally(diconnect);

    if(getAllProduct.length > 0){
      return getAllProduct;
    }

    return []
   
  }

  public async update(newProduct: Product): Promise<Product> {
    connect();
    const { id: __id, ...product } = newProduct;
    const updateProduct = await prisma.product
      .update({
        where: { id: __id },
        data: product,
      })
      .finally(diconnect);

    return updateProduct;
  }

  public async search(value: string): Promise<Product[]> {
    const searchResult = await prisma.product
      .findMany({
        where: {
          OR: [
            {
              name: { contains: value },
            },
            {
              category: { contains: value },
            },
            { subCategory: { contains: value } },
          ],
        },
      })
      .finally(diconnect);


      if(searchResult.length > 0){
        return searchResult;
      }

      return []
  }
}

export { ProductRepository };
