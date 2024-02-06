import bcrypt from "bcrypt";

class BcryptMiddlewareMod {

    constructor(private password: string){}

    async ecrypt(){
        const hashPassword = await bcrypt.hash(this.password, 10);
        return hashPassword;
    }
    
}

export { BcryptMiddlewareMod }