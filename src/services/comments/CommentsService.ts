import { CommentCore } from "../../core/comment/CommentCore";
import { Comment } from "../../interfaces/comment/comment";
import { DefaultServicesResponse } from "../../middleware/response.services";
import { CommentRepository } from "../../repositories/comment/CommentRepository";
import { ProductRepository } from "../../repositories/procuct/ProductRepository";
import { UserRepository } from "../../repositories/user/UserRepository";
import { ProductService } from "../product/ProductService";
import { UserService } from "../user/UserService";

class CommentService {

  private CommentRepository
  constructor(CommentRepository: CommentRepository) {
    this.CommentRepository = CommentRepository
  }



  async executeCreate(data: Comment): Promise<DefaultServicesResponse<Comment>>{

   
    //VALIDANDO OS DADOS
        if (!await new CommentCore().validationDataToCreate(data)) {
            return {
                status: 1001,
                data: null
            }
        }

    //VERIFICANDO USER
    const user = await new UserService(new UserRepository()).executeGet(data.authorId)
        if (!user.data) {
            return {
                status: 403,
                data: null
            }
        }
   
    
    //VERIFICANDO O PRODUCT
    const product = await new ProductService(new ProductRepository()).executeGet(data.product_commentedId)
        if (!product.data) {
            return {
                status: 400,
                data: null
            }
        }


    //CRIANDO O COMMENT
        const create = await this.CommentRepository.create(data);
        return {
            data: create
        }

  }



  async executeUpdate(data: Comment): Promise<DefaultServicesResponse<Comment>> {

   
    //VALIDANDO OS DADOS
        if (!await new CommentCore().validationDataToCreate(data)) {
            return {
                status: 1001,
                data: null
            }
        }

    

    //VERIFICANDO O COMMENT
        const comment = await this.executeGet(data.id)
        if (!comment.data) {
            return {
                status: 404,
                data: null
            }
        }



    //VERIFICANDO SE O MESMO USER QUE CRIOU ESTA TENTANDO MODIFICAR O COMMENT
        if (data.authorId !== comment.data.authorId) {
            return {
                status: 403,
                data: null
            }
        }



        const insertComment = {
            authorId: comment.data.authorId,
            createdAt: comment.data.createdAt,
            id: comment.data.id,
            product_commentedId: comment.data.product_commentedId,
            stars: data.stars,
            title: data.title
        }

    //ATUALIZANDO O COMMENT
        const update = await this.CommentRepository.update(insertComment);
        return {
            data: update
        }


  }




  async executeGetByProduct(product_commentedId: string): Promise<DefaultServicesResponse<Array<Comment>>>{

    
    //VALIDANDO ID
        if (!await new CommentCore().validationId(product_commentedId)) {
            return {
                status: 1001,
                data: null
            }
        }



    //BUSCANDO COMMENTs
        const comments = await this.CommentRepository.getByProduct(product_commentedId);
        return {
            data: comments
        };

  }


  async executeGet(id: string): Promise<DefaultServicesResponse<Comment>>{

       
    //VALIDANDO ID
        if (!await new CommentCore().validationId(id)) {
            return {
                status: 1001,
                data: null
            }
        }



    //BUSCANDO COMMENTs
        const comments = await this.CommentRepository.get(id);
        return {
            data: comments
        };


  }


  async executeGetByUser(authorId: string): Promise<DefaultServicesResponse<Array<Comment>>>{

       
    //VALIDANDO ID
        if (!await new CommentCore().validationId(authorId)) {
            return {
                status: 1001,
                data: null
            }
        }



    //BUSCANDO COMMENTs
        const comments = await this.CommentRepository.getByUser(authorId);
        return {
            data: comments
        };


  }




  async executeDelete(id: string, userId: string): Promise<DefaultServicesResponse<void>>{
  
    //VALIDANDO ID
        if (!await new CommentCore().validationId(id)) {
            return {
                status: 1001,
                data: null
            }
        }



    //VALIDANDO ID
        if (!await new CommentCore().validationId(userId)) {
            return {
                status: 1001,
                data: null
            }
        }



    //VERIFICANDO SE O COMMENT EXISTE
        const comment = await this.executeGet(id);
        if (!comment.data) {
            return {
                status: 404,
                data: null
            }
        }



    //VERIFICANDO SE O USER É DONO DO COMMENT
        if (userId !== comment.data.authorId) {
            return {
                status: 403,
                data: null
            }
        }


        
    //DELETANDO COMMENTs
        const comments = await this.CommentRepository.delete(id);
        return {
            data: comments
        };


  }


}
export { CommentService };
