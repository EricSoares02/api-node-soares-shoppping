import { connect, diconnect } from "../../database/database";
import { Comment, CommentTypeToGetByProduct, ICommentRepositories } from "../../interfaces/IComment";
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

public async getByProduct(product_commentedId: string): Promise<CommentTypeToGetByProduct[]> {
  
  connect();
  
  const CommentsByProduct = await prisma.comments.findMany(
    {
      where:{product_commentedId},
      include: {
        _count:{
          select:{likes:true}}}
    }
    ).finally(diconnect);

    if(CommentsByProduct.length > 0){

    const T = CommentsByProduct.map((comment)=>{
      return {
        id: comment.id,
        title: comment.title,
        stars: comment.stars,
        likes: comment._count.likes,
        createdAt: comment.createdAt
      }
      })
      
      return T
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