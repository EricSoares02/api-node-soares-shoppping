import { SubCategory } from "./subCategory";

export interface ISubCategoryRepository{

    create(data: SubCategory): Promise<SubCategory>

    update(data: SubCategory): Promise<SubCategory>

    get(id: string): Promise<SubCategory | null>

    checkByCategory(name: string, nameCategory:string): Promise<SubCategory | null>

    delete(id: string): Promise<SubCategory>
}