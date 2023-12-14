
//função para decodificar bearer token, com jwt
function DecodedTokenJwt(authorization?:string){
      if (authorization === undefined) {
            return ""
          }
      const token = authorization.split(" ")[1];
      return token;
}
export {DecodedTokenJwt}