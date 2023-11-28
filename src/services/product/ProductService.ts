import { Product } from "../../interfaces/IProduct";
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

    const create = await this.ProductRepository.create(name,
        url_img,
        price_in_cent,
        category,
        subCategory,
        options,
        storeId,
        desc )
    return create
  }

  public async executeGetAllProductRepository(){

    const products = await this.ProductRepository.getAll();
    return products

  }

  public async executeUpdateProductRepositoy(newProduct: Product){

    const update = await this.ProductRepository.update(newProduct);

    return update;
  }

  public async executeGetByIdProductRepository(id:string){

    const product = await this.ProductRepository.getById(id);
    return product

  }

  public async executeSearchProductRepository(value: string){

    const searchResult = this.ProductRepository.search(value);
    return searchResult

  }

}


export { ProductService };
