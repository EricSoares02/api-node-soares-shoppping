import bcrypt from "bcrypt";

class BcryptMiddlewareMod {

    constructor(private password: string){}

    async ecrypt(){
        const hashPassword = await bcrypt.hash(this.password, 10);
        return hashPassword;
    }

    async comparePassword(encryptedPassword: string){
        return await bcrypt.compare(this.password, encryptedPassword)
    }
    
}

export { BcryptMiddlewareMod }