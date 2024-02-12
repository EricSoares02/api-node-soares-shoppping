import { connect, diconnect } from "../../database/database";
import { SubCategory } from "../../interfaces/subcategory/subCategory";
import { ISubCategoryRepository } from "../../interfaces/subcategory/subCategory.repository";
import { prisma } from "../../services/prisma/prisma";

class SubCategoryRepository implements ISubCategoryRepository {
  

    async create(data: SubCategory): Promise<SubCategory> {
        connect();
        const createdSubCategory = await prisma.subcategory
            .create({
                data,
            })
            .finally(diconnect);

        return createdSubCategory;
    }


    async update(data: SubCategory): Promise<SubCategory> {
        connect();
        const createdSubCategory = await prisma.subcategory
            .update({
                where:{
                id: data.id
                },
            data,
            })
        .finally(diconnect);

        return createdSubCategory;
    }


    async get(id: string): Promise<SubCategory | null> {
        connect();
        const createdSubCategory = await prisma.subcategory
            .findFirst({
                where:{
                id
                }
            })
        .finally(diconnect);

        return createdSubCategory;
    }

    async checkByCategory(name: string, nameCategory:string): Promise<SubCategory | null> {
        connect();
        const createdSubCategory = await prisma.subcategory
            .findFirst({
                where:{
                    name: name,
                category :{
                    name: nameCategory
                }
                }
            })
        .finally(diconnect);

        return createdSubCategory;
    }


    async delete(id: string): Promise<void> {
        connect();
        const createdSubCategory = await prisma.subcategory
            .delete({
                where:{
                id
                }
            })
        .finally(diconnect);
        createdSubCategory
        return 
    }

}

export { SubCategoryRepository };
