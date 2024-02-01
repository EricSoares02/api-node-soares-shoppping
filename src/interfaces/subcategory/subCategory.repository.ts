import { ISubCategory } from "./subCategory";

export interface ISubCategoryRepository{

    create(data: ISubCategory): Promise<ISubCategory>


}