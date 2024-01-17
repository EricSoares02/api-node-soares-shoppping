import Jwt from "jsonwebtoken";

type JwtPayload = {
    id: string;
  };

export function GetIdByJwtToken(token: string){


    if (token === '' || token === undefined) {
        return null
    } else if (token.length > 20) {
        const { id } = Jwt.decode(token) as JwtPayload;
        return id
    } 

    return null

}