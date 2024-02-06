import { z } from "zod";

import { ZodValidationData } from "../../middleware/validationData.Zod";
import { User } from "../../interfaces/user/user";
import { BcryptMiddlewareMod } from "../../middleware/bcrypt/PasswordMiddleware";


const EmailSchema = z.string().email();
const IdSchema = z.string().length(24);


const UserSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  photo: z.string().url().optional(),
  email: EmailSchema,
  password: z.string().min(6)
});

class UserCore {
    
    async validationEmail(email: string) {
        return await new ZodValidationData(EmailSchema, email).parse();
      }
    
    async validationId(id: string) {
        return await new ZodValidationData(IdSchema, id).parse();
      }

    async validationData(data: User) {
        return await new ZodValidationData(UserSchema, data).parse();
      }

    encryptingPassword(password: string){
        return new BcryptMiddlewareMod(password).ecrypt()
      }
}

export { UserCore }