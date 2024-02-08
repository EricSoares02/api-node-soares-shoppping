import { SubCategoryCore } from "../../core/subCategory/SubCategoryCore";
import { SubCategory } from "../../interfaces/subcategory/subCategory";
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


  async executeCreate(data: SubCategory, id: string){

    
    //VALIDADO OS DADOS
        if (!await new SubCategoryCore().validationData(data)) {
        return null;
        }


    //VERIFICANDO SE QUEM ESTÁ TENTANDO FAZER A CHAMADA É UM ELDER
        if (!await new ElderService(new ElderRepository()).executeGet(id)) {
            return null
        }

    
    //VERIFICANDO SE A CATEGORIA EXISTE
        if (!await new CategoryService(new CategoryRepository()).executeGet(data.categoryId)) {
            return null
        }


    //CRIANDO A SUBCATEGORY
        const created = this.SubCategoryRepository.create(data)
        return created

  }


  async executeUpdate(data: SubCategory, id: string){

        
    //VALIDADO OS DADOS
        if (!await new SubCategoryCore().validationData(data)) {
            return null;
        }


    //VERIFICANDO SE QUEM ESTÁ TENTANDO FAZER A CHAMADA É UM ELDER
        if (!await new ElderService(new ElderRepository()).executeGet(id)) {
            return null
        }    


    //VERIFICANDO SE A CATEGORIA EXISTE
        if (!await new CategoryService(new CategoryRepository()).executeGet(data.categoryId)) {
            return null
        }   

    
    //ATUALIZANDO  A SUBCATEGORIA
        const updated = this.SubCategoryRepository.create(data)
        return updated

  }


  async executeGet(id: string){


    //VALIDANDO O ID
        if (!await new SubCategoryCore().validationId(id)) {
            return null
        }

    
    //PROCURANDO SUBCATEGORY
        const subcategory = this.SubCategoryRepository.get(id)
        return subcategory

  }


  async executeGetByName(name: string){


    //VALIDANDO O NAME
        if (!await new SubCategoryCore().validationName(name)) {
            return null
        }

    
    //PROCURANDO SUBCATEGORY
        const subcategory = this.SubCategoryRepository.getByName(name)
        return subcategory

  }


  async executeDelete(id: string, elderId: string){


    //VALIDANDO O ID
        if (!await new SubCategoryCore().validationId(id)) {
            return null
        }


    //VERIFICANDO SE QUEM ESTÁ TENTANDO FAZER A CHAMADA É UM ELDER
        if (!await new ElderService(new ElderRepository()).executeGet(elderId)) {
            return null
        }    
        
    
    //VERIFICANDO SE A SUBCATEGORY EXISTE
        if (!await this.executeGet(id)) {
            return null
        }

    
    //DELETENDO A SUBCATEGORY
        const subcategory = this.SubCategoryRepository.delete(id)
        return subcategory

  }


}

export { SubCategoryService };
