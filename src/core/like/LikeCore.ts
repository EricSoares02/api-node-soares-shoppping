import { z } from "zod";
import { ZodValidationData } from "../../middleware/validationData.Zod";
import { Like } from "../../interfaces/like/like";



const IdSchema = z.string().length(24);


const LikeSchemaToCreate = z.object({
    authorId: IdSchema,
    commentId: IdSchema,
    makedAt: z.date().optional()
});

class LikeCore {
  

  async validationId(id: string) {
    return await new ZodValidationData(IdSchema, id).parse();
  }


  async validationData(data: Like) {
    return await new ZodValidationData(LikeSchemaToCreate, data).parse();
  }


  async verifyDoubleLike(data: Array<Like>, commentId: string){

   const verify = data.filter((like)=> like.commentId === commentId)

   if (verify.length > 0) {
    return true
   }
   
   return false

  }

}


export { LikeCore };
