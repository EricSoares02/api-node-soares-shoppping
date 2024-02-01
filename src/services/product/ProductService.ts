import { CreateProductType } from "../../interfaces/IProduct";
import { ProductRepository } from "../../repositories/product/ProductRepository";

class ProductService {
  constructor(private ProductRepository: ProductRepository) {}

  public async executeCreateProductRepository(
    Product: CreateProductType
  ) {

    const create = await this.ProductRepository.create(Product)
    return create
  }

  public async executeGetAllProductRepository(){

    const products = await this.ProductRepository.getAll();
    return products

  }

  public async executeUpdateProductRepositoy(id : string, newProduct: CreateProductType){

    const update = await this.ProductRepository.update(id, newProduct);

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
