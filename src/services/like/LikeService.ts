import { LikeCore } from '../../core/like/LikeCore'
import { Like } from '../../interfaces/like/like'
import { DefaultServicesResponse } from '../../middleware/response.services'
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



    async executeLike(data: Like): Promise<DefaultServicesResponse<Like>>{


        //VALIDANDO DADOS
            if (!await new LikeCore().validationData(data)) {
                return {
                    status: 1001,
                    data: null
                }
            }

        
        //VERIFICANDO USER
            const user = await new UserService(new UserRepository()).executeGet(data.authorId);
            if (!user.data) {
                return {
                    status: 403,
                    data: null
                }
            }



        //VERIFICANDO O COMMENT
            const comment = await new CommentService(new CommentRepository()).executeGet(data.commentId);
            if (!comment.data) {
                return {
                    status: 404,
                    data: null
                }
            }


        //VERIFICANDO SE O USER JÁ CURTIU O COMENTÁRIO 
            const verifyLike = await this.executeGetByUser(data.authorId);
            if (verifyLike.data && await new LikeCore().verifyDoubleLike(verifyLike.data, data.commentId)) {
                return {
                    status: 400,
                    data: null
                }
            }


        //CURTINDO O COMENTÁRIO
            const like = await this.LikeRepository.liked(data);
            return {
                data: like
            }

    }



    async executeGetByUser(authorId: string): Promise<DefaultServicesResponse<Array<Like>>>{


        //VALIDANDO O ID 
            if (!await new LikeCore().validationId(authorId)) {
                return {
                    status: 1001,
                    data: null
                }
            }


        //BUSCANDO OS LIKES
            const likes = await this.LikeRepository.getByUser(authorId);
            return {
                data: likes
            }

    }



    
    async executeGet(id: string): Promise<DefaultServicesResponse<Like>>{


        //VALIDANDO O ID 
            if (!await new LikeCore().validationId(id)) {
                return {
                    status: 1001,
                    data: null
                }
            }


        //BUSCANDO OS LIKES
            const likes = await this.LikeRepository.get(id);
            return {
                data: likes
            }

    }




    async executeDislike(id: string, authorId: string): Promise<DefaultServicesResponse<void>>{


        //VALIDANDO O ID 
            if (!await new LikeCore().validationId(id)) {
                return {
                    status: 1001,
                    data: null
                }
            }


        //VERIFICANDO SE O COMMENT EXISTE
            const comment = await this.executeGet(id)
            if (!comment.data) {
                return {
                    status: 404,
                    data: null
                }
            }


        //VERIFICANDO SE O USER É O MSM, SÓ ELE PODE APAGAR O SEU LIKE
            if (comment.data.authorId !== authorId) {
                return {
                    status: 403,
                    data: null
                }
            }

            
        //BUSCANDO OS LIKES
            const likes = await this.LikeRepository.disliked(id);
            return {
                data: likes
            }

    }


}

export { LikeService }