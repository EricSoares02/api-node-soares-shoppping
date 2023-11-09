import { Response } from "express";
import { IComments, ICommentsParams } from "../../model/product/Produto";
import { z } from "zod";
import { VerifyUser } from "./VerifyUser";

const CommentSchema = z.object({
    title: z.string().max(100, {message:"o número máximo de caracteres é 100"}),
    stars: z.number().lte(5, {message:"as estrelas não podem ser maior que 5 por user"}).nonnegative({message:"as estrelas devem ser um número positivo ou 0"}),

})


export function CreateCommentMiddleware(commentquery:ICommentsParams,comment:IComments, res: Response){

        CommentSchema.parse(comment);
        VerifyUser(commentquery,comment, res)

}