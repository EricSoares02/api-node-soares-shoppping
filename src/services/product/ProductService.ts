import { ProductCore } from '../../core/product/ProductCore'
import { IProductParamsToCreate, IProductParamsToUpdate, Product } from '../../interfaces/product/product'
import { DefaultServicesResponse } from '../../middleware/response.services'
import { AdminRepository } from '../../repositories/admins/AdminRepository'
import { CategoryRepository } from '../../repositories/category/CategoryRepository'
import { ProductRepository } from '../../repositories/procuct/ProductRepository'
import { SubCategoryRepository } from '../../repositories/subCategory/subCategoryRepository'
import { AdminService } from '../admins/AdminService'
import { CategoryService } from '../category/CategoryService'
import { SubCategoryService } from '../subCategory/SubCategoryService'

class ProductService {

  private ProductRepository
  constructor(ProductRepository: ProductRepository) {
    this.ProductRepository = ProductRepository
  }


  async executeCreate(data: IProductParamsToCreate, creatorId: string): Promise<DefaultServicesResponse<Product>>{


    //VALIDANDO OS DADOS 
        if (!await new ProductCore().validationDataToCreate(data)) {
            return {
              status: 1001,
              data: null
            }
        }


    //VERICANDO SE QUEM ESTA CHAMANDO O END POINT É UM ADMIN OU MASTER
        const admin = await new AdminService(new AdminRepository()).executeGet(creatorId);
        if (!admin.data) {
            return {
              status: 403,
              data: null
            }
        }



    //VERIFICANDO A CATEGORIA E SUBCATEGORIA
        const category = await new CategoryService(new CategoryRepository()).executeGetByName(data.categoryName)
        const subCategory = await new SubCategoryService(new SubCategoryRepository()).executeCheckByCategory(data.subCategoryName, data.categoryName)
        if (!category.data || !subCategory.data) {
            return {
              status: 400,
              data: null
            }
     //VERIFICANDO SE A SUBCATEGORIA PERTENCE ÀQUELA CATEGORIA
        } else if (subCategory.data.categoryId !== category.data.id) {
            return {
              status: 400,
              data: null
            }
        }




    //VERIFICANDO OPTIONS
        if (!await new ProductCore().verifyOptions(data.options, {category: category.data.name , subCategory: subCategory.data.name})) {
            return {
              status: 1001,
              data: null
            }
        }
        

        const product = {
            id: '',
            categoryId: category.data.id,
            subCategoryId: subCategory.data.id,
            desc: data.desc,
            name: data.name,
            options: data.options,
            photos: data.photos,
            price: data.price,
            storeId: admin.data.storeId ?? ''
        }
        const create = await this.ProductRepository.create(product)
        return {
          data: create
        }
  }


  async executeUpdate(data: IProductParamsToUpdate, userId: string): Promise<DefaultServicesResponse<Product>>{


    //VALIDANDO OS DADOS 
      if (!await new ProductCore().validationDataToUpdate(data)) {
          return {
            status: 1001,
            data: null
          }
      }


    //VERIFICANDO SE O PRODUTO EXISTE 
      const verifyProduct = await this.executeGet(data.id);
      if (!verifyProduct.data) {
        return {
          status: 404,
          data: null
        }
      }



    //VERICANDO SE QUEM ESTA CHAMANDO O END POINT É UM ADMIN OU MASTER DA MSM LOJA QUE O PRODUTO
      const admin = await new AdminService(new AdminRepository()).executeGet(userId);
      if (!admin.data || admin.data.storeId !== verifyProduct.data.storeId) {
          return {
            status: 403,
            data: null
          }
      }


    //VERIFICANDO A CATEGORIA E SUBCATEGORIA
      const category = await new CategoryService(new CategoryRepository()).executeGetByName(data.categoryName)
      const subCategory = await new SubCategoryService(new SubCategoryRepository()).executeCheckByCategory(data.subCategoryName, data.categoryName)
      if (!category.data || !subCategory.data) {
          return {
            status: 400,
            data: null
          }
    //VERIFICANDO SE A SUBCATEGORIA PERTENCE ÀQUELA CATEGORIA
      } else if (subCategory.data.categoryId !== category.data.id) {
          return {
            status: 400,
            data: null
          }
      }



    //VERIFICANDO OPTIONS
      if (!await new ProductCore().verifyOptions(data.options, {category: category.data.name, subCategory: subCategory.data.name})) {
        return {
          status: 1001,
          data: null
        }
      }
  


      const product = {
        id: data.id,
        categoryId: category.data.id,
        subCategoryId: subCategory.data.id,
        desc: data.desc,
        name: data.name,
        options: data.options,
        photos: data.photos,
        price: data.price,
        storeId: verifyProduct.data.storeId ?? ''
      }


      const update = await this.ProductRepository.update(product)
      return {
        data: update
      }


  }


  async executeDelete(id: string, userId: string): Promise<DefaultServicesResponse<void>>{

   
    //VALIDANDO ID
      if (!await new ProductCore().validationId(id)) {
          return {
            status: 1001,
            data: null
          }
      }


    //VERIFICANDO SE O PRODUTO EXISTE 
      const verifyProduct = await this.executeGet(id);
      if (!verifyProduct.data) {
          return {
            status: 404,
            data: null
          }
      }


    //VERICANDO SE QUEM ESTA CHAMANDO O END POINT É UM ADMIN OU MASTER DA MSM LOJA QUE O PRODUTO
      const admin = await new AdminService(new AdminRepository()).executeGet(userId);
      if (!admin.data || admin.data.storeId !== verifyProduct.data.storeId) {
          return {
            status: 403,
            data: null
          }
      }

    //BUSCANDO O PRODUTO
      const remove = await this.ProductRepository.delete(id)
      return {
        data: remove
      }


  }


  async executeGet(id: string): Promise<DefaultServicesResponse<Product>>{


    //VALIDANDO ID
        if (!await new ProductCore().validationId(id)) {
            return {
              status: 1001,
              data: null
            }
        }


    //BUSCANDO O PRODUTO
        const product = await this.ProductRepository.get(id)
        return {
          data: product
        }

  }


  async executeGetByCategory(category: string): Promise<DefaultServicesResponse<Array<Product>>>{


    //VALIDANDO CATEGORY
      if (!await new ProductCore().validationParams(category)) {
          return {
            status: 1001,
            data: null
          }
      }


    //BUSCANDO O PRODUTO
      const product = await this.ProductRepository.getByCategory(category)
      return {
        data: product
      }

  }


  async executeAll()/*: Promise<DefaultServicesResponse<Array<Product>>>*/{

    /*
    ...
    **/

  }


  async executeGetByParams(params: string): Promise<DefaultServicesResponse<Array<Product>>>{



    //VALIDANDO PARAMS
      if (!await new ProductCore().validationParams(params)) {
        return {
          status: 1001,
          data: null
        }
      }


    //BUSCANDO O PRODUTO
    const product = await this.ProductRepository.getByParams(params)
    return {
      data: product
    }

  }


}

export { ProductService };
