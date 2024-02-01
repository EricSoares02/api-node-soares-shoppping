import Jwt from "jsonwebtoken";

type JwtPayload = {
    id: string;
  };


class JwtMiddleware {

    private authorization: string = ''
    constructor(authorization:string){
        this.authorization = authorization
    }

    DecodedToken(){
        if (this.authorization === '') {
            return this.authorization
          }
      const token = this.authorization.split(" ")[1];
      return token;
    }

    GetIdByToken(){

        if (this.DecodedToken() === '' || this.DecodedToken() === undefined) {
            return null
        } else if (this.DecodedToken().length > 20) {
            const { id } = Jwt.decode(this.DecodedToken()) as JwtPayload;
            return id
        } 
    
        return null
    }

}

export {JwtMiddleware}