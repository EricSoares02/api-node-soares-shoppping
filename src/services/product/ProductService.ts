import { ProductRepository } from "../../repositories/product/ProductRepository";

class ProductService {
  constructor(private ProductRepository: ProductRepository) {}

  public async executeCreateProductRepository(
    name: string,
    url_img: string[],
    price_in_cent: number,
    category: string,
    subCategory: string,
    options: string[],
    storeId: string,
    desc: string | null
  ) {
    const create = await this.ProductRepository.create(
      name,
      url_img,
      price_in_cent,
      category,
      subCategory,
      options,
      storeId,
      desc
    );
    return create;
  }
}

export { ProductService };
