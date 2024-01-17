
//função para decodificar bearer token, com jwt
function DecodedTokenJwt(authorization:string){
      if (authorization === '') {
            return authorization
          }
      const token = authorization.split(" ")[1];
      return token;
}
export {DecodedTokenJwt}