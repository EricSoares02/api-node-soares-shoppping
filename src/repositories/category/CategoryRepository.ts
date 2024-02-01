import { connect, diconnect } from "../../database/database";
import { CategoryType } from "../../interfaces/category/category";
import { CategoryTypeResponseToCreate, ICategoryRepository } from "../../interfaces/category/category.repository";
import { prisma } from "../../services/prisma/prisma";


class CategoryRepository implements ICategoryRepository{


   async create(data: CategoryType): Promise<CategoryTypeResponseToCreate> {    
        connect();
        const categoryCreated = await prisma.category.create({
            data: {
                name: data.name
            }
        }).finally(diconnect);

        return categoryCreated
    }

    async update(data: CategoryType): Promise<CategoryType> {
    
        connect();
        const categoryUpdated = await prisma.category.update({
            where: {id: data.id},
            data: {
                name: data.name,
            }
        }).finally(diconnect);

        return categoryUpdated   
    }

    async getCategory(id: string): Promise<CategoryType> {
        connect();
        const category = await prisma.category.findFirst({
            where: {id}
        }).finally(diconnect);

        if (!category) {
            return {
                id: '',
                name: ''
            }
        }
        return category   
    }

    async getCategoryByName(name: string): Promise<CategoryType> {
        connect();
        const category = await prisma.category.findFirst({
            where: {name}
        }).finally(diconnect);

        if (!category) {
            return {
                id: '',
                name: ''
            }
        }
        return category   
    }

    async delete(id: string): Promise<void> {
        connect();
        const category = await prisma.category.delete({
            where: {id}
        }).finally(diconnect);
        console.log(category)
        return 
    }
}

export { CategoryRepository }