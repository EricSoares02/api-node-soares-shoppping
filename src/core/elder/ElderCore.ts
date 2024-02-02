import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { Elder } from "../../interfaces/elder/elder";

const EmailSchema = z.string().email();
const IdSchema = z.string().length(24);

enum Role{
    elder= 'elder'
}
const ElderSchema = z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    email: EmailSchema,
    password: z.string().min(6),
    role: z.nativeEnum(Role)
})
class ElderCore {
    
    async validationEmail(email: string) {
        return await ValidationData(EmailSchema, email);
      }
    
    async validationId(id: string) {
        return await ValidationData(IdSchema, id);
      }

    async validationData(data: Elder) {
        return await ValidationData(ElderSchema, data);
      }

}

export {ElderCore}