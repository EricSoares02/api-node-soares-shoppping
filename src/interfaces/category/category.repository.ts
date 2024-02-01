import { CategoryType } from "./category";

export type CategoryTypeResponseToCreate = {
    id: string
    name: string 
    subcategories?: string[] 
}


export interface ICategoryRepository {

    create(data: CategoryType): Promise<CategoryTypeResponseToCreate>

    update(data: CategoryType): Promise<CategoryType>

    getCategory(id: string): Promise<CategoryType>

    getCategoryByName(name: string): Promise<CategoryType>

    delete(id: string): Promise<void>
}