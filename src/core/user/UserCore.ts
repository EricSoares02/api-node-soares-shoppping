import { DecodedTokenJwt } from "../../middleware/decodedToken.Jwt";
import { UserRepository } from "../../repositories/user/UserRepository";
import { UserService } from "../../services/user/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StoreService } from "../../services/store/createStoreService";
import { StoreRepository } from "../../repositories/store/CreateStoreRepository";

class UserCore {
  public async verifyUser(email: string) {
    const userExist = await new UserService(
      new UserRepository()
    ).executeLoginUserRepository(email);
    //se o id do user for diferente de uma string vazia, ele existe, então retormamos true, dizendo que o msm existe, logo não pode ser cadastrado.
    if (userExist.id !== "") {
      return true;
    }
    //se não, retornamos false, dizendo que pode ser cadastrado
    return false;
  }

  public async verifyStore(storeId: string){
    const storeExist = await new StoreService(
      new StoreRepository()
    ).executeGetStoreById(storeId);
    //se o id da store for diferente de uma string vazia, ele existe, então retormamos true
    if (storeExist.id !== "") {
      return true;
    }
    //se não, retornamos false
    return false;
  }

  public async encryptPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }

  public async verifyRoleToCreateUser(userRole: string, creatorId: string) {

   
    //se o creatorId e user Role for diferente uma string vazia, seguimos as seguintes regras
      if (creatorId !== '' && userRole !== '') {

        const creator = await new UserService(new UserRepository()).executeGetByIdUserRepository(creatorId)
          switch (userRole) {
            case 'admin':
  
              if (creator.role === 'master' || creator.role === 'elder') {
                return true
              } 
              return false

            case 'master':
              if (creator.role === 'elder') {
                return true
              } 
              return false
            default:
              return false
          }
    //se o creator for undefined
      } else if (creatorId === '' || userRole ==='') {
         return false
      }
       
      

  }

  public async comparePassword(email: string, password: string) {
    //buscamos o user no banco de dados
    const userExist = await new UserService(
      new UserRepository()
    ).executeLoginUserRepository(email);
    // verificamos se ele existe
    //se não existe, retornamos false
    if (userExist.id === "") {
      return false;
    }
    // se existe, comparamos o senha infarmada com a senha do banco e retornamos se é true ou false
    const compare = await bcrypt.compare(password, userExist.password);
    return compare;
  }

  public async login(email: string) {
    //buscamos o user no banco de dados
    const User = await new UserService(
      new UserRepository()
    ).executeLoginUserRepository(email);
    // verificamos se ele existe
    //se não existe
    const token = jwt.sign({ id: User.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "1d",
    });

    return {
      user: {first_name:User.first_name, last_name: User.last_name} ,
      access_token: token,
    };
  }

  public async decodedToken(token: string){

    const hashToken = DecodedTokenJwt(token);
    return hashToken

  }
}

export { UserCore };
