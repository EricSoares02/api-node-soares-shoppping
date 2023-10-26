import { Response } from "express";
import { createUserService } from "../../services/user/createUser";
import { z } from "zod";
import { IUser } from "../../model/user/User";

// schema de validaçao do user
const UserSchema = z.object({
    firstName: z.string().min(3),
    midName: z.string().min(4).optional(),
    lastName: z.string().min(4),
    nickName: z.string().min(4),
    email: z.string().email(),
    password: z.string(),
    photo: z.string().url().optional(),
  });



export function CreateUserMiddleware(user:IUser, res: Response){
    //validando user recebido por props
    UserSchema.parse(user); 
    createUserService(res,user)  

}