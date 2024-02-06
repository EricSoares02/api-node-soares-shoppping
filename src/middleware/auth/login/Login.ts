import { ElderRepository } from "../../../repositories/elder/ElderRepository";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { AdminService } from "../../../services/admins/AdminService";
import { ElderService } from "../../../services/elder/ElderService";
import { UserService } from "../../../services/user/UserService";
import { JwtMiddleware } from "../../Jwt/JwtToken";
import { BcryptMiddlewareMod } from "../../bcrypt/PasswordMiddleware";

class LoginMiddleware{


    constructor(private password: string, private email: string){}


    async searchUser(){

        let user = await new UserService(new UserRepository()).executeGetByEmail(this.email)

        if (!user) {
            user = await new AdminService(new UserRepository()).executeGetByEmail(this.email);
            if (!user) {
                user = await new ElderService(new ElderRepository()).executeGetByEmail(this.email)
            }
        }

        return user

    }

    async login(){

        const user = await this.searchUser()
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