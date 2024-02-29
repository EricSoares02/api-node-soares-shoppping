import { CategoryCore } from "../../core/category/CategoryCore";
import { Category } from "../../interfaces/category/category";
import { DefaultServicesResponse } from "../../middleware/response.services";
import { CategoryRepository } from '../../repositories/category/CategoryRepository'
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { ElderService } from "../elder/ElderService";



class CategoryService {

    private CategoryRepository
    constructor(CategoryRepository: CategoryRepository){
        this.CategoryRepository = CategoryRepository
    }

    async executeCreate(data: Category, id: string): Promise<DefaultServicesResponse<Category>>{

        // VALIDANDO OS DADOS
            if (!await new CategoryCore().validationData(data)) {
                return {
                    status: 1001,
                    data: null
                };
            }

        //VERIFICANDO SE A CATEGORIA JÁ EXISTE
            const category = await this.executeGetByName(data.name);
            if (category.data) {
                return {
                    status: 400,
                    data: null
                }
            }

        //VERIFICANDO SE QUEM ESTA TENTANDO FAZER A OPERAÇÃO É UM ELDER
            const elder = await new ElderService(new ElderRepository()).executeGet(id)
            if (!elder.data) {
                return {
                    status: 403,
                    data: null
                }
            } 

        //CRIANDO CATEGORIA
            const created = await this.CategoryRepository.create(data);
            return {
                data: created
            }
    }


    async executeUpdate(data: Category, id: string): Promise<DefaultServicesResponse<Category>>{

        // VALIDANDO OS DADOS
            if (!await new CategoryCore().validationDataToUpdate(data)) {
                return {
                    status: 1001,
                    data: null
                };
            }

        //VERIFICANDO SE A CATEGORIA EXISTE
            const category = await this.executeGet(data.id);
            if (!category.data) {
                return {
                    status: 404,
                    data: null
                }
            }

        //VERIFICANDO SE QUEM ESTA TENTANDO FAZER A OPERAÇÃO É UM ELDER
            const elder = await new ElderService(new ElderRepository()).executeGet(id)
            if (!elder.data) {
                return {
                    status: 403,
                    data: null
                }
            }    


        // ATUALIZANDO CATEGORIA
            const update = await this.CategoryRepository.update(data)
            return {
                data: update
            }
    }


    async executeGet(id: string): Promise<DefaultServicesResponse<Category>>{

        //VERIFICANDO SE O ID É VALIDO
            if(!await new CategoryCore().validationId(id)){
                return {
                    status: 1001,
                    data: null
                }
            }

        //BUSCANDO A CATEGORIA
            const category = await this.CategoryRepository.get(id)
            if (!category) {
                return {
                    status: 404,
                    data: null
                }
            }

            return {
                data: category
            }
    }


    async executeGetByName(name:string): Promise<DefaultServicesResponse<Category>>{

        //VERIFICANDO SE O NOME É VALIDO
            if(!await new CategoryCore().validationName(name)){
                return {
                    status: 1001,
                    data: null
                }
            }
        
        //BUSCANDO A CATEGORIA
            const category = await this.CategoryRepository.getByName(name);
            if (!category) {
                return {
                    status: 404,
                    data: null
                }
            }

            
            return {
                data: category
            }
    }


    async executeDelete(categoryId: string, elderId: string): Promise<DefaultServicesResponse<Category>> {
         
        //VERIFICANDO SE O ID É VALIDO
            if(!await new CategoryCore().validationId(elderId)){
                return {
                    status: 1001,
                    data: null
                }
            }

        

        //VERIFICANDO SE QUEM ESTA TENTANDO FAZER A OPERAÇÃO É UM ELDER
            const elder = await new ElderService(new ElderRepository()).executeGet(elderId);
            if (!elder.data) {
                return {
                    status: 403,
                    data: null
                }
            }            


        //VERIFICANDO SE A CATEGORIA EXISTE
            const category = await this.executeGet(categoryId);
            if (!category.data) {
                return {
                    status: 404,
                    data: null
                }
            }

        
        //DELETANDO A CATEGORIA
            const deleted = await this.CategoryRepository.delete(categoryId)
            return {
                data: deleted
            }
    }

}

export {CategoryService}