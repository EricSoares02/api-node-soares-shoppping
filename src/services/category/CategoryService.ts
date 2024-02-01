import { Response } from "express";
import { CategoryCore } from "../../core/category/CategoryCore";
import { CategoryType } from "../../interfaces/category/category";
import { ICategoryRepository } from "../../interfaces/category/category.repository";
import { BadRequest, InternalError } from "../../middleware/errors.express";

class CategoryService {

    private CategoryRepository
    private res
    constructor(CategoryRepository: ICategoryRepository, res: Response){
        this.CategoryRepository = CategoryRepository
        this.res = res
    }

    async executeCreate(data: CategoryType){

        // VALIDANDO OS DADOS
        new CategoryCore().validationData(data).catch(()=> {
            return new InternalError('Something is Wrong', this.res).returnError();
        })
        //VERIFICANDO SE A CATEGORIA JÁ EXISTE
        const category = await this.executeGetByName(data.name);
        if (category) {
            return new BadRequest('This Category Exist', this.res).returnError()
        }
        const created = this.CategoryRepository.create(data);
        return created
    }

    async executeUpdate(data: CategoryType){

        //VALIDANDO OS DADOS 
        new CategoryCore().validationData(data).catch(()=> {
            return new InternalError('Something is Wrong', this.res).returnError();
        })
        //VERIFICANDO SE A CATEGORIA EXISTE
        const category = await this.executeGetByName(data.name);
        if (!category) {
            return new BadRequest('This Category Does not Exist', this.res).returnError()
        }
        const update = this.CategoryRepository.update(data)
        return update
    }

    executeGet(id: string){

        //VERIFICANDO SE O ID É VALIDO
        new CategoryCore().validationId(id).catch(()=> {
            return new InternalError('Something is Wrong With Id', this.res).returnError();
        })

        const category = this.CategoryRepository.getCategory(id)
        return category
    }

    executeGetByName(name:string){

        //VERIFICANDO SE O NOME É VALIDO
        new CategoryCore().validationName(name).catch(()=> {
            return new InternalError('Something is Wrong With Name', this.res).returnError();
        })

        const category = this.CategoryRepository.getCategoryByName(name)
        return category
    }

    async executeDelete(id: string){
         //VERIFICANDO SE O ID É VALIDO
         new CategoryCore().validationId(id).catch(()=> {
            return new InternalError('Something is Wrong With Id', this.res).returnError();
        });

        //VERIFICANDO SE A CATEGORIA EXISTE
        const category = await this.executeGet(id);
        if (!category) {
            return new BadRequest('This Category Does Not Exist', this.res).returnError();
        }
        
        const deleted = this.CategoryRepository.delete(id)
        return deleted
    }

}

export {CategoryService}