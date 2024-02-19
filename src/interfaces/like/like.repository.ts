import { Like } from "./like";


export interface ILikeRepository {

    liked(data: Like): Promise<Like>

    deliked(id: string): Promise<void>


}