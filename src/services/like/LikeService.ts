import { LikeCore } from '../../core/like/LikeCore'
import { Like } from '../../interfaces/like/like'
import { CommentRepository } from '../../repositories/comment/CommentRepository'
import { LikeRepository } from '../../repositories/like/LikeRepository'
import { UserRepository } from '../../repositories/user/UserRepository'
import { CommentService } from '../comments/CommentsService'
import { UserService } from '../user/UserService'

class LikeService {

    private LikeRepository
    constructor(LikeRepository: LikeRepository){
       this.LikeRepository = LikeRepository
    }



    async executeLike(data: Like){


        //VALIDANDO DADOS
            if (!await new LikeCore().validationData(data)) {
                return null
            }

        
        //VERIFICANDO USER
            const user = await new UserService(new UserRepository()).executeGet(data.authorId);
            if (!user) {
                return null
            }



        //VERIFICANDO O COMMENT
            const comment = await new CommentService(new CommentRepository()).executeGet(data.commentId);
            if (!comment) {
                return null
            }


        //VERIFICANDO SE O USER JÁ CURTIU O COMENTÁRIO 
            const verifyLike = await this.executeGetByUser(data.authorId);
            if (verifyLike && await new LikeCore().verifyDoubleLike(verifyLike, data.commentId)) {
                return null
            }


        //CURTINDO O COMENTÁRIO
            const like = await this.LikeRepository.liked(data);
            return like

    }



    async executeGetByUser(authorId: string){


        //VALIDANDO O ID 
            if (!await new LikeCore().validationId(authorId)) {
                return null
            }


        //BUSCANDO OS LIKES
            const likes = this.LikeRepository.getByUser(authorId);
            return likes

    }



    
    async executeGet(id: string){


        //VALIDANDO O ID 
            if (!await new LikeCore().validationId(id)) {
                return null
            }


        //BUSCANDO OS LIKES
            const likes = this.LikeRepository.get(id);
            return likes

    }




    async executeDislike(id: string, authorId: string){


        //VALIDANDO O ID 
            if (!await new LikeCore().validationId(id)) {
                return null
            }


        //VERIFICANDO SE O COMMENT EXISTE
            const comment = await this.executeGet(id)
            if (!comment) {
                return null
            }


        //VERIFICANDO SE O USER É O MSM, SÓ ELE PODE APAGAR O SEU LIKE
            if (comment.authorId !== authorId) {
                return null
            }

            
        //BUSCANDO OS LIKES
            const likes = this.LikeRepository.disliked(id);
            return likes

    }


}

export { LikeService }