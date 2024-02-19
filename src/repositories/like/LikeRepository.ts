import { connect, diconnect } from "../../database/database";
import { Like } from "../../interfaces/like/like";
import { ILikeRepository } from "../../interfaces/like/like.repository";
import { prisma } from "../../services/prisma/prisma";

class LikeRepository implements ILikeRepository {
  
  
    async liked(data: Like): Promise<Like> {
        
        connect();
        const like = await prisma.likesComment.create({
            data
        }).finally(diconnect)

        return like

    }
    
    
    
    async disliked(id: string): Promise<void> {

        connect();
        const like = await prisma.likesComment.delete({
            where: {
                id
            }
        }).finally(diconnect)

        like
        return 

    }



    async getByUser(authorId: string): Promise<Like[] | null> {
        

        connect();
        const like = await prisma.likesComment.findMany({
            where: {
                authorId
            }
        }).finally(diconnect)

        
        return like

    }


}

export { LikeRepository };
