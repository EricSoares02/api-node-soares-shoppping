import { CommentCore } from "../../core/comment/CommentCore";
import { Comment } from "../../interfaces/comment/comment";
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



  async executeCreate(data: Comment) {

   
    //VALIDANDO OS DADOS
        if (!await new CommentCore().validationDataToCreate(data)) {
            return null
        }

    //VERIFICANDO USER
        if (!await new UserService(new UserRepository()).executeGet(data.authorId)) {
            return null
        }
   
    
    //VERIFICANDO O PRODUCT
        if (!await new ProductService(new ProductRepository()).executeGet(data.product_commentedId)) {
            return null
        }


    //CRIANDO O COMMENT
        const create = await this.CommentRepository.create(data);
        return create

  }



  async executeUpdate(data: Comment){

   
    //VALIDANDO OS DADOS
        if (!await new CommentCore().validationDataToCreate(data)) {
            return null
        }

    

    //VERIFICANDO O COMMENT
        const comment = await this.executeGet(data.id)
        if (!comment) {
            return null
        }



    //VERIFICANDO SE O MESMO USER QUE CRIOU ESTA TENTANDO MODIFICAR O COMMENT
        if (data.authorId !== comment.authorId) {
            return null
        }



        const insertComment = {
            authorId: comment.authorId,
            createdAt: comment.createdAt,
            id: comment.id,
            product_commentedId: comment.product_commentedId,
            stars: data.stars,
            title: data.title
        }

    //ATUALIZANDO O COMMENT
        const update = await this.CommentRepository.update(insertComment);
        return update


  }




  async executeGetByProduct(product_commentedId: string) {

    
    //VALIDANDO ID
        if (!await new CommentCore().validationId(product_commentedId)) {
            return null
        }



    //BUSCANDO COMMENTs
        const comments = await this.CommentRepository.getByProduct(product_commentedId);
        return comments;

  }


  async executeGet(id: string) {

       
    //VALIDANDO ID
        if (!await new CommentCore().validationId(id)) {
            return null
        }



    //BUSCANDO COMMENTs
        const comments = await this.CommentRepository.get(id);
        return comments;


  }


  async executeGetByUser(authorId: string) {

       
    //VALIDANDO ID
        if (!await new CommentCore().validationId(authorId)) {
            return null
        }



    //BUSCANDO COMMENTs
        const comments = await this.CommentRepository.getByUser(authorId);
        return comments;


  }




  async executeDelete(id: string){
  
    //VALIDANDO ID
        if (!await new CommentCore().validationId(id)) {
            return null
        }



    //VERIFICANDO SE O COMMENT EXISTE
        if (!await this.executeGet(id)) {
            return null
        }



    //DELETANDO COMMENTs
        const comments = await this.CommentRepository.delete(id);
        return comments;


  }


}
export { CommentService };
