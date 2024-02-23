import { UserCore } from "../../core/user/UserCore";
import { User } from "../../interfaces/user/user";
import { EmailCheckModule } from "../../middleware/@findEmailModule/searchEmail";
import { DefaultServicesResponse } from "../../middleware/response.services";
import { UserRepository } from "../../repositories/user/UserRepository";

class UserService {
  private UserRepository;
  constructor(UserRepository: UserRepository) {
    this.UserRepository = UserRepository;
  }

  async executeCreate(data: User): Promise<DefaultServicesResponse<Partial<User>>>{

    //VALIDADO OS DADOS
    if (!await new UserCore().validationData(data)) {
      return {
        status: 1001,
        data: null
      };
    }

    //VERIFICANDO SE O EMAIL EXISTE NO DATABASE
    if (await new EmailCheckModule(data.email).find()) {
      return {
        status: 400,
        data: null
      };
    }

    //CRIANDO UM NOVO USER E ENCRIPTANDO A SENHA
    const user: User = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        id: data.id,
        password: await new UserCore().encryptingPassword(data.password),
        photo: data.photo      
    }

    //CRIANDO O USER E RETORNANDO
    const created = await this.UserRepository.create(user);
    return {
      data: created
    };
  }


  async executeUpdate(data: User): Promise<DefaultServicesResponse<Partial<User>>>{

    //VALIDADO OS DADOS 
    if (!await new UserCore().validationData(data)) {
        return {
          status: 1001,
          data: null
        }
    }

    //VERIFICANDO SE A CONTA EXISTE
    const userExist = await this.executeGet(data.id);
    if(!userExist.data){
        return {
          status: 404,
          data: null
        }
    }


    //SE O USUÁRIO QUISER TROCAR O EMAIL
    if (data.email !== userExist.data.email) {
    //VERIFICANDO SE O NOVO EMAIL EXISTE NO DATABASE
        if (await new EmailCheckModule(data.email).find()) {
            return {
              status: 400,
              data: null
            }
        }
    }
    
    const updated = await this.UserRepository.update(data);
    return {
      data: updated
    }

  }


  async executeGet(id: string): Promise<DefaultServicesResponse<Partial<User>>>{

    //VERIFICANDO SE O ID É VÁLIDO
    if (!await new UserCore().validationId(id)) {
      return {
        status: 1001,
        data: null
      };
    }

    // PROCURANDO USER E RETORNANDO
    const user = await this.UserRepository.get(id);
    return {
      data: user
    };
  }


  async executeGetByEmail(email: string): Promise<DefaultServicesResponse<Partial<User>>>{

    //VERIFICANDO SE O EMAIL É VÁLIDO
    if (!await new UserCore().validationEmail(email)) {
      return {
        status: 1001,
        data: null
      };
    }

    // PROCURANDO USER E RETORNANDO
    const user = await this.UserRepository.getByEmail(email);
    return {
      data: user
    };
  }


  async executeDelete(id: string): Promise<DefaultServicesResponse<void>>{

        //VERIFICANDO SE O ID É VÁLIDO
        if (!await new UserCore().validationId(id)) {
            return {
              status: 1001,
              data: null
            };
        }

        //VERIFICANDO SE O USER EXISTE, SE SIM, PODEMOS DELETAR
        const user = await this.executeGet(id)
        if (!user.data) {
          return {
            status: 404,
            data: null
          }
        }

        const remove = await this.UserRepository.delete(id);
        return {
          data: remove
        }

      }

  async executeLogin(email: string): Promise<DefaultServicesResponse<Partial<User>>>{

    //VERIFICANDO SE O EMAIL É VÁLIDO
    if (!await new UserCore().validationEmail(email)) {
      return {
        status: 1001,
        data: null
      };
    }

    // FAZENDO LOGIN
    const login = await this.UserRepository.login(email);
    return {
      data: login
    };
  }
}

export { UserService };
