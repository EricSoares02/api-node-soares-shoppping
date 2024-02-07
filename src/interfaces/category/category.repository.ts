import { Category } from "./category";



export interface ICategoryRepository {

    create(data: Category): Promise<Category>

    update(data: Category): Promise<Category>

    get(id: string): Promise<Category | null>

    getByName(name: string): Promise<Category | null>

    delete(id: string): Promise<void>
}