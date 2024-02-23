import { SubCategoryCore } from "../../core/subCategory/SubCategoryCore";
import { SubCategory } from "../../interfaces/subcategory/subCategory";
import { DefaultServicesResponse } from "../../middleware/response.services";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { SubCategoryRepository } from "../../repositories/subCategory/subCategoryRepository";
import { CategoryService } from "../category/CategoryService";
import { ElderService } from "../elder/ElderService";

class SubCategoryService {

  private SubCategoryRepository;

  constructor(SubCategoryRepository: SubCategoryRepository) {
    this.SubCategoryRepository = SubCategoryRepository;
  }


  async executeCreate(data: SubCategory, id: string): Promise<DefaultServicesResponse<SubCategory>>{

    
    //VALIDADO OS DADOS
        if (!await new SubCategoryCore().validationData(data)) {
        return {
            status: 1001,
            data: null
        };
        }


    //VERIFICANDO SE QUEM ESTÁ TENTANDO FAZER A CHAMADA É UM ELDER
        const elder = await new ElderService(new ElderRepository()).executeGet(id)
        if (!elder.data) {
            return {
                status: 403,
                data: null
            }
        }

    
    //VERIFICANDO SE A CATEGORIA EXISTE
        const category = await new CategoryService(new CategoryRepository()).executeGet(data.categoryId) 
        if (!category.data) {
            return {
                status: 400,
                data: null
            }
        }


    //CRIANDO A SUBCATEGORY
        const created = await this.SubCategoryRepository.create(data)
        return {
            data: created
        }

  }


  async executeUpdate(data: SubCategory, id: string): Promise<DefaultServicesResponse<SubCategory>>{

        
    //VALIDADO OS DADOS
        if (!await new SubCategoryCore().validationData(data)) {
            return {
                status: 1001,
                data: null
            };
        }


    //VERIFICANDO SE QUEM ESTÁ TENTANDO FAZER A CHAMADA É UM ELDER
        const elder = await new ElderService(new ElderRepository()).executeGet(id)
        if (!elder.data) {
            return {
                status: 403,
                data: null
            }
        }    


    //VERIFICANDO SE A CATEGORIA EXISTE
        const category = await new CategoryService(new CategoryRepository()).executeGet(data.categoryId)
        if (!category.data) {
            return {
                status: 400,
                data: null
            }
        }   



    //VERIFICANDO SE A SUBCATEGORY EXISTE
        const verifySubCategory = await this.executeGet(data.id)
        if (!verifySubCategory.data) {
            return {
                status: 404,
                data: null
            }
        }
    
    //ATUALIZANDO  A SUBCATEGORIA
        const updated = await this.SubCategoryRepository.create(data)
        return {
            data: updated
        }

  }


  async executeGet(id: string): Promise<DefaultServicesResponse<SubCategory>>{


    //VALIDANDO O ID
        if (!await new SubCategoryCore().validationId(id)) {
            return {
                status: 1001,
                data: null
            }
        }

    
    //PROCURANDO SUBCATEGORY
        const subcategory = await this.SubCategoryRepository.get(id)
        return {
            data: subcategory
        }

  }


  async executeCheckByCategory(name: string, categoryName: string): Promise<DefaultServicesResponse<SubCategory>>{


    //VALIDANDO O NAME
        if (!await new SubCategoryCore().validationName(name)) {
            return {
                status: 1001,
                data: null
            }
        }

    //VALIDANDO O NAME
        if (!await new SubCategoryCore().validationName(categoryName)) {
            return {
                status: 1001,
                data: null
            }
        }

    
    //PROCURANDO SUBCATEGORY
        const subcategory = await this.SubCategoryRepository.checkByCategory(name, categoryName)
        return {
            data: subcategory
        }

  }


  async executeDelete(id: string, elderId: string): Promise<DefaultServicesResponse<void>>{


    //VALIDANDO O ID
        if (!await new SubCategoryCore().validationId(id)) {
            return {
                status: 1001,
                data: null
            }
        }


    //VERIFICANDO SE QUEM ESTÁ TENTANDO FAZER A CHAMADA É UM ELDER
        const elder = await new ElderService(new ElderRepository()).executeGet(elderId)
        if (!elder.data) {
            return {
                status: 403,
                data: null
            }
        }    
        
    
    //VERIFICANDO SE A SUBCATEGORY EXISTE
        const subCategory = await this.executeGet(id)
        if (!subCategory.data) {
            return {
                status: 404,
                data: null
            }
        }

    
    //DELETENDO A SUBCATEGORY
        const remove = await this.SubCategoryRepository.delete(id)
        return {
            data: remove
        }

  }


}

export { SubCategoryService };
