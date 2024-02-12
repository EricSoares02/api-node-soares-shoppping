import { Product, ProductGetType } from "./product";


export interface IProductRepository {

    create(data: Product): Promise<ProductGetType>;
    
    update(data: Product): Promise<ProductGetType>;

    get(id: string): Promise<ProductGetType | null>;
  
    getAll(): Promise<ProductGetType[] | null>;

    getByParams(prop: string): Promise<ProductGetType[] | null>

    getByCategory(category: string): Promise<ProductGetType[] | null>

    delete(id: string): Promise<void>
  
  }