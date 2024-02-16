import { ProductCore } from '../../core/product/ProductCore'
import { IProductParamsToCreate, IProductParamsToUpdate } from '../../interfaces/product/product'
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


  async executeCreate(data: IProductParamsToCreate, creatorId: string){


    //VALIDANDO OS DADOS 
        if (!await new ProductCore().validationDataToCreate(data)) {
            return null
        }


    //VERICANDO SE QUEM ESTA CHAMANDO O END POINT É UM ADMIN OU MASTER
        const admin = await new AdminService(new AdminRepository()).executeGet(creatorId);
        if (!admin) {
            return null
        }



    //VERIFICANDO A CATEGORIA E SUBCATEGORIA
        const category = await new CategoryService(new CategoryRepository()).executeGetByName(data.categoryName)
        const subCategory = await new SubCategoryService(new SubCategoryRepository()).executeCheckByCategory(data.subCategoryName, data.categoryName)
        if (!category || !subCategory) {
            return null
     //VERIFICANDO SE A SUBCATEGORIA PERTENCE ÀQUELA CATEGORIA
        } else if (subCategory.categoryId !== category.id) {
            return null
        }




    //VERIFICANDO OPTIONS
        if (!await new ProductCore().verifyOptions(data.options, {category: category.name , subCategory: subCategory.name})) {
            return null
        }
        

        const product = {
            id: '',
            categoryId: category.id,
            subCategoryId: subCategory.id,
            desc: data.desc,
            name: data.name,
            options: data.options,
            photos: data.photos,
            price: data.price,
            storeId: admin.storeId ?? ''
        }
        const create = await this.ProductRepository.create(product)
        return create
  }


  async executeUpdate(data: IProductParamsToUpdate, userId: string){


    //VALIDANDO OS DADOS 
      if (!await new ProductCore().validationDataToUpdate(data)) {
          return null
      }


    //VERIFICANDO SE O PRODUTO EXISTE 
      const verifyProduct = await this.executeGet(data.id);
      if (!verifyProduct) {
        return null
      }



    //VERICANDO SE QUEM ESTA CHAMANDO O END POINT É UM ADMIN OU MASTER DA MSM LOJA QUE O PRODUTO
      const admin = await new AdminService(new AdminRepository()).executeGet(userId);
      if (!admin || admin.storeId !== verifyProduct.storeId) {
          return null
      }


    //VERIFICANDO A CATEGORIA E SUBCATEGORIA
      const category = await new CategoryService(new CategoryRepository()).executeGetByName(data.categoryName)
      const subCategory = await new SubCategoryService(new SubCategoryRepository()).executeCheckByCategory(data.subCategoryName, data.categoryName)
      if (!category || !subCategory) {
          return null
    //VERIFICANDO SE A SUBCATEGORIA PERTENCE ÀQUELA CATEGORIA
      } else if (subCategory.categoryId !== category.id) {
          return null
      }



    //VERIFICANDO OPTIONS
      if (!await new ProductCore().verifyOptions(data.options, {category: category.name, subCategory: subCategory.name})) {
        return null
      }
  


      const product = {
        id: data.id,
        categoryId: category.id,
        subCategoryId: subCategory.id,
        desc: data.desc,
        name: data.name,
        options: data.options,
        photos: data.photos,
        price: data.price,
        storeId: verifyProduct.storeId ?? ''
      }


      const update = await this.ProductRepository.update(product)
      return update


  }


  async executeDelete(id: string, userId: string){

   
    //VALIDANDO ID
      if (!await new ProductCore().validationId(id)) {
          return null
      }


    //VERIFICANDO SE O PRODUTO EXISTE 
      const verifyProduct = await this.executeGet(id);
      if (!verifyProduct) {
          return null
      }


    //VERICANDO SE QUEM ESTA CHAMANDO O END POINT É UM ADMIN OU MASTER DA MSM LOJA QUE O PRODUTO
      const admin = await new AdminService(new AdminRepository()).executeGet(userId);
      if (!admin || admin.storeId !== verifyProduct.storeId) {
          return null
      }

    //BUSCANDO O PRODUTO
      await this.ProductRepository.delete(id)
      return 


  }


  async executeGet(id: string){


    //VALIDANDO ID
        if (!await new ProductCore().validationId(id)) {
            return null
        }


    //BUSCANDO O PRODUTO
        const product = await this.ProductRepository.get(id)
        return product

  }


  async executeGetByCategory(category: string){


    //VALIDANDO CATEGORY
      if (!await new ProductCore().validationParams(category)) {
          return null
      }


    //BUSCANDO O PRODUTO
      const product = await this.ProductRepository.getByCategory(category)
      return product

  }


  async executeAll(){

    /*
    ...
    **/

  }


  async executeGetByParams(params: string){



    //VALIDANDO PARAMS
      if (!await new ProductCore().validationParams(params)) {
        return null
      }


    //BUSCANDO O PRODUTO
    const product = await this.ProductRepository.getByParams(params)
    return product

  }


}

export { ProductService };
