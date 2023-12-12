import { connect, diconnect } from "../../database/database";
import { Comment, ICommentRepositories } from "../../interfaces/IComment";
import { prisma } from "../../services/prisma/prisma";

class CommentRepository implements ICommentRepositories{

public async create(authorId: string, product_commentedId: string, title: string, stars: number): Promise<Comment> {
    
    connect();
    const createComment = await prisma.comments
      .create({
        data: {
          authorId,
          product_commentedId,
          title,
          stars,
        },
      })
      .finally(diconnect);
    return createComment;


}

public async getByProduct(product_commentedId: string): Promise<Comment[]> {
  
  connect();
  
  const CommentsByProduct = await prisma.comments.findMany({where:{product_commentedId}}).finally(diconnect)


    if(CommentsByProduct.length > 0){
        return CommentsByProduct
    }

    return []

}


public async getByUser(authorId: string): Promise<Comment[]> {
    
    connect();
  
    const CommentsByUser = await prisma.comments.findMany({where:{authorId}}).finally(diconnect)
  
  
      if(CommentsByUser.length > 0){
          return CommentsByUser
      }
  
      return []

}


}

export {CommentRepository}