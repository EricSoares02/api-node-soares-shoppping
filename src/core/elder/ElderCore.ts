import { z } from "zod";

import { Elder } from "../../interfaces/elder/elder";
import { ZodValidationData } from "../../middleware/validationData.Zod";
import { BcryptMiddlewareMod } from "../../middleware/bcrypt/PasswordMiddleware";


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
        return await new ZodValidationData(EmailSchema, email).parse();
      }
    
    async validationId(id: string) {
        return await new ZodValidationData(IdSchema, id).parse();
      }

    async validationData(data: Elder) {
        return await new ZodValidationData(ElderSchema, data).parse();
      }

    encryptingPassword(password: string){
      return new BcryptMiddlewareMod(password).ecrypt()
    }

}

export {ElderCore}