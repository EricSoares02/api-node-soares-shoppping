import { connect, diconnect } from "../../database/database";
import { Product, IProductRepositories, CreateProductType } from "../../interfaces/IProduct";
import { prisma } from "../../services/prisma/prisma";

class ProductRepository implements IProductRepositories {
  public async create(
    data: CreateProductType
  ): Promise<Product> {
    connect();
    const createProduct = await prisma.product
      .create({
        data
      })
      .finally(diconnect);
    return createProduct;
  }

  public async getById(id: string): Promise<Product> {
    connect();
    const getProductById = await prisma.product
      .findFirst({
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


  public async update(id: string, newProduct: CreateProductType): Promise<Product> {
    connect();
    const updateProduct = await prisma.product
      .update({
        where: { id },
        data: newProduct,
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
