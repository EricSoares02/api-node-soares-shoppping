import { connect, diconnect } from "../../database/database";
import { Product, ProductGetType } from "../../interfaces/product/product";
import { IProductRepository } from "../../interfaces/product/product.repository";
import { prisma } from "../../services/prisma/prisma";


class ProductRepository implements IProductRepository {
 

async create(data: Product): Promise<ProductGetType> {
    

    connect();
    const create = await prisma.product
      .create({
        data
      })
      .finally(diconnect);
    return create;

}


async update(data: Product): Promise<ProductGetType> {
  
    
    connect();
    const update = await prisma.product
      .update({
        where: { id: data.id },
        data
      })
      .finally(diconnect);

    return update;

}


async delete(id: string): Promise<void> {
 
    
    connect();
    const remove = await prisma.product
      .delete({
        where: { id }
      })
      .finally(diconnect);
    remove
    return 

}



async get(id: string): Promise<ProductGetType | null> {
    

    connect();
    const product = await prisma.product
      .findFirst({
        where: { id },
      })
      .finally(diconnect);


    return product

}


async getAll(): Promise<ProductGetType[] | null> {
    

    connect();
    const products = await prisma.product
      .findMany()
      .finally(diconnect);


    return products

    
}


async getByParams(prop: string): Promise<ProductGetType[] | null> {

    
    const products = await prisma.product
      .findMany({
        where: {
          OR: [
            {
              name: { contains: prop },
            },
            {
              category: { name: prop },
            },
            {
              subCategory: { name: prop}
            }
          ],
        },
      })
      .finally(diconnect);


      return products

}


async getByCategory(category: string): Promise<ProductGetType[] | null> {
    
    
    const products = await prisma.product
      .findMany({
        where: {
          category: {
            OR: [
              {
                name: category
              },
              {
                id: category
              }
            ]
          }
        },
      })
      .finally(diconnect);


      return products
}


}

export { ProductRepository };
