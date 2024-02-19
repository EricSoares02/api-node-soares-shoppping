import { z } from "zod";
import { AdminRepository } from "../../../repositories/admins/AdminRepository";
import { ElderRepository } from "../../../repositories/elder/ElderRepository";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { AdminService } from "../../../services/admins/AdminService";
import { ElderService } from "../../../services/elder/ElderService";
import { UserService } from "../../../services/user/UserService";
import { JwtMiddleware } from "../../Jwt/JwtToken";
import { BcryptMiddlewareMod } from "../../bcrypt/PasswordMiddleware";
import { ZodValidationData } from "../../validationData.Zod";

class LoginMiddleware{


    constructor(private password: string, private email: string){}



    async validationData(){

            const loginSchema = z.object({
                password: z.string().min(6),
                email: z.string().email()
            });

            return new ZodValidationData(loginSchema, {password: this.password, email: this.email}).parse()
    }


    async searchUser(){


        if (!await this.validationData()) {
            return null
        }

        
        let user = await new UserService(new UserRepository()).executeLogin(this.email)

        if (!user) {
            user = await new AdminService(new AdminRepository()).executeLogin(this.email);
            if (!user) {
                user = await new ElderService(new ElderRepository()).executeLogin(this.email)
            }
        }

        return user

    }

    async login(){

        const user = await this.searchUser();
        
        if(!user){
            return user 
        }

        const passwordIsEqual = await new BcryptMiddlewareMod(this.password).comparePassword(user.password ?? '')
        
        if (!passwordIsEqual) {
            return null
        }

       const token = new JwtMiddleware('').GenereteToken(user.id ?? '');

       return token

    }

}

export { LoginMiddleware }