import { connect, diconnect } from "../../database/database";
import { Category } from "../../interfaces/category/category";
import { ICategoryRepository } from "../../interfaces/category/category.repository";
import { prisma } from "../../services/prisma/prisma";


class CategoryRepository implements ICategoryRepository{


   async create(data: Category): Promise<Category> {    
        connect();
        const categoryCreated = await prisma.category.create({
            data: {
                name: data.name
            }
        }).finally(diconnect);

        return categoryCreated
    }


    async update(data: Category): Promise<Category> {
    
        connect();
        const categoryUpdated = await prisma.category.update({
            where: {id: data.id},
            data: {
                name: data.name,
            }
        }).finally(diconnect);

        return categoryUpdated   
    }


    async get(id: string): Promise<Category | null> {
        connect();
        const category = await prisma.category.findFirst({
            where: {id}
        }).finally(diconnect);

        return category   
    }

    async getByName(name: string): Promise<Category | null> {
        connect();
        const category = await prisma.category.findFirst({
            where: {name}
        }).finally(diconnect);

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