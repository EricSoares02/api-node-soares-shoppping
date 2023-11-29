import { IRequestCreateUser } from "../../interfaces/IUser";
import { UserRepository } from "../../repositories/user/UserRepository";
import { UserService } from "../../services/user/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  public async encryptPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }

  public async verifyRoleToCreateUser(data: IRequestCreateUser) {
    const service = new UserService(new UserRepository());
    let creator = null;

    //se o criador for diferente de undefined, seguimos as seguintes regras
    if (data.creator !== undefined) {
      //switch para verificar qual o tipo de role do user que pretendemos criar
      switch (data.data.role) {
        //PARA CRIAR UM ADMIN
        case "admin":
          //buscamos a role do criador
          creator = await service.executeGetByIdUserRepository(data.creator.id);
          /*
             o creator precisa ser um admin da msm loja || um master da msm loja || um elder
             para criar um admin ((o creator precisa ser um admin && ser da msm loja) || (o creator precisa ser um master && ser da msm loja) || creator pode ser um elder) && (também precisamos verificar se a role do creator que recebemos é igual a que está no banco)
             */
          if (
            ((creator.role === "admin" &&
              creator.storeId === data.data.storeId) ||
              (creator.role === "master" &&
                creator.storeId === data.data.storeId) ||
              creator.role === "elder") &&
            data.creator.role === creator.role
          ) {
            //se as condições forem aceitas, retornamos verdadeiro
            return true;
          }
          //se as condições não forem aceitas, retornamos falso
          return false;

          break;
        //PARA CRIAR UM MASTER
        case "master":
          //buscamos a role do criador
          creator = await service.executeGetByIdUserRepository(data.creator.id);
          /*
            para criar um master ((o creator precisa ser um master && ser da msm loja) || (o creator precisa ser um elder)) && (também precisamos verificar se a role do creator que recebemos é igual a que está no banco)
            */
          if (
            ((creator.role === "master" &&
              creator.storeId === data.data.storeId) ||
              creator.role === "elder") &&
            data.creator.role === creator.role
          ) {
            //se as condições forem aceitas, retornamos verdadeiro
            return true;
          }
          //se as condições não forem aceitas, retornamos falso
          return false;

          break;
        //PARA CRIAR UM ELDER
        case "elder":
          //buscamos a role do criador
          creator = await service.executeGetByIdUserRepository(data.creator.id);
          //para criar um elder, o creator precisa ser um elder && precisamos verificar se a role do creator que recebemos é igual a que está no banco
          if (creator.role === "elder" && data.creator.role === creator.role) {
            //se as condições forem aceitas, retornamos verdadeiro
            return true;
          }
          //se as condições não forem aceitas, retornamos falso
          return false;

          break;
        default:
          //por padrão retornamos verdadeiro pq um usuario comum pode ser criado sem dificuldades. podemos retornar true sem problemas pois a validação dos dados já ocorreu neste momento, então se user não é um user especial, ele é um user padrão e não está fora das regras
          return true;
          break;
      }

      //se o creator for undefined
    } else if (data.creator === undefined) {
      // primeiro verificamos se está sendo criado um user padrão, se caso esteja, retornamos true pois o user padrão não precisa de creator
      if (data.data.role === "user") {
        return true;
      }
      //caso não seja um user padrão, retornamos false, pois user especiais precisam de creator
      return false;
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
      expiresIn: "1h",
    });

    return {
      user: {
        id: User.id,
        url_img: User.url_img,
      },
      token: token,
    };
  }
}

export { UserCore };
