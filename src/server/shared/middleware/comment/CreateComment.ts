import { Response } from "express";
import { IComments } from "../../model/product/Produto";
import { z } from "zod";
import { VerifyUser } from "./VerifyUser";

const CommentSchema = z.object({
    authorId: z.string(),
    product_commentedId: z.string(),
    title: z.string().max(100, {message:"o número máximo de caracteres é 100"}),
    stars: z.number().lte(5, {message:"as estrelas não podem ser maior que 5 por user"}).nonnegative({message:"as estrelas devem ser um número positivo ou 0"}),

})


export function CreateCommentMiddleware(comment:IComments, res: Response){

        CommentSchema.parse(comment);
        VerifyUser(comment, res)

}