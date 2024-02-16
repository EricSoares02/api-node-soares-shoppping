import { connect, diconnect } from "../../database/database";
import { Comment } from "../../interfaces/comment/comment";
import { ICommentRepository } from "../../interfaces/comment/comment.repository";
import { prisma } from "../../services/prisma/prisma";

class CommentRepository implements ICommentRepository{


    async create(data: Comment): Promise<Comment> {
    
        connect();
        const comment = await prisma.comments
        .create({
            data
      })
      .finally(diconnect);
        return comment;

    }




    async update(data: Comment): Promise<Comment> {
        
        connect();
        const update = await prisma.comments.update({
            where: {
                id: data.id
            }, data
        }).finally(diconnect);
        return update

    }




    async get(id: string): Promise<Comment | null> {
        connect();
        const comments = await prisma.comments.findFirst({
            where: {
                id
            }
        }).finally(diconnect);
        return comments 
    }




    async getByProduct(product_commentedId: string): Promise<Comment[] | null> {
        
        connect();
        const comments = await prisma.comments.findMany(
            {
                where:{product_commentedId},
                include: {
                    _count:{
                        select:{likes:true}}}
            }
        ).finally(diconnect);
        return comments

    }

    


    async getByUser(authorId: string): Promise<Comment[] | null> {
        
        connect();
        const comments = await prisma.comments.findMany({
            where: {
                authorId
            }
        }).finally(diconnect)
        return comments

    }



    
    async delete(id: string): Promise<void> {
        
        connect()
        const comment = await prisma.comments.delete({
            where: {
                id
            }
        }).finally(diconnect);
        comment
        return

    }


}

export {CommentRepository}