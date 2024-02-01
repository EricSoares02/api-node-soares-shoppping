import { connect, diconnect } from "../../database/database";
import { ISubCategory } from "../../interfaces/subcategory/subCategory";
import { ISubCategoryRepository } from "../../interfaces/subcategory/subCategory.repository";
import { prisma } from "../../services/prisma/prisma";

class SubCategoryRepository implements ISubCategoryRepository{


   async create(data: ISubCategory): Promise<ISubCategory> {
        
    connect()
    const createdSubCategory = await prisma.subcategory.create({
        data
    }).finally( diconnect )

    return createdSubCategory
    }

}

export { SubCategoryRepository }