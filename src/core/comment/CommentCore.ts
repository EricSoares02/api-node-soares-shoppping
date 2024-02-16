import { z } from "zod";
import { ZodValidationData } from "../../middleware/validationData.Zod";
import { Comment } from '../../interfaces/comment/comment'

const IdSchema = z.string().length(24);

const CommentSchemaToCreate = z.object({
    authorId: IdSchema,
    product_commentedId: IdSchema,
    title: z.string().min(1).max(100),
    stars: z.number().nonnegative().lt(5),
    createdAt: z.date().optional()
});


class CommentCore {


    async validationId(id: string) {
        return await new ZodValidationData(IdSchema, id).parse();
      }


    async validationDataToCreate(data: Comment) {
        return await new ZodValidationData(CommentSchemaToCreate, data).parse();
    }




}


export { CommentCore };
