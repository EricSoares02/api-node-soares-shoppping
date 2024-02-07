import { CategoryCore } from "../../core/category/CategoryCore";
import { Category } from "../../interfaces/category/category";
import { ICategoryRepository } from "../../interfaces/category/category.repository";
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { ElderService } from "../elder/ElderService";


class CategoryService {

    private CategoryRepository
    constructor(CategoryRepository: ICategoryRepository){
        this.CategoryRepository = CategoryRepository
    }

    async executeCreate(data: Category, id: string){

        // VALIDANDO OS DADOS
            if (!await new CategoryCore().validationData(data)) {
                return null;
            }

        //VERIFICANDO SE A CATEGORIA JÁ EXISTE
            const category = await this.executeGetByName(data.name);
            if (category) {
                return null
            }

        //VERIFICANDO SE QUEM ESTA TENTANDO FAZER A OPERAÇÃO É UM ELDER
            if (!await new ElderService(new ElderRepository()).executeGet(id)) {
                return null
            } 

        //CRIANDO CATEGORIA
            const created = this.CategoryRepository.create(data);
            return created
    }


    async executeUpdate(data: Category, id: string){

        // VALIDANDO OS DADOS
            if (!await new CategoryCore().validationData(data)) {
                return null;
            }

        //VERIFICANDO SE A CATEGORIA EXISTE
            const category = await this.executeGetByName(data.name);
            if (!category) {
                return null
            }

        //VERIFICANDO SE QUEM ESTA TENTANDO FAZER A OPERAÇÃO É UM ELDER
            if (!await new ElderService(new ElderRepository()).executeGet(id)) {
                return null
            }    


        // ATUALIZANDO CATEGORIA
            const update = this.CategoryRepository.update(data)
            return update
    }


    async executeGet(id: string){

        //VERIFICANDO SE O ID É VALIDO
            if(!await new CategoryCore().validationId(id)){
                return null
            }

        //BUSCANDO A CATEGORIA
            const category = this.CategoryRepository.get(id)
            return category
    }


    async executeGetByName(name:string){

        //VERIFICANDO SE O NOME É VALIDO
            if(!await new CategoryCore().validationName(name)){
                return null
            }
        
        //BUSCANDO A CATEGORIA
            const category = this.CategoryRepository.getByName(name)
            return category
    }


    async executeDelete(id: string){
         
        //VERIFICANDO SE O ID É VALIDO
            if(!await new CategoryCore().validationId(id)){
                return null
            }

        //VERIFICANDO SE A CATEGORIA EXISTE
            const category = await this.executeGet(id);
            if (!category) {
                return category
            }
        
        //DELETANDO A CATEGORIA
            const deleted = this.CategoryRepository.delete(id)
            return deleted
    }

}

export {CategoryService}