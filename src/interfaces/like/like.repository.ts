import { Like } from "./like";


export interface ILikeRepository {

    liked(data: Like): Promise<Like>

    disliked(id: string): Promise<void>

    get(id: string): Promise<Like | null>

    getByUser(authorId: string): Promise<Array<Like> | null>

}