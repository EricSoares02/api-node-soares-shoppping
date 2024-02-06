import { UserCore } from "../../core/user/UserCore";
import { User } from "../../interfaces/user/user";
import { EmailCheckModule } from "../../middleware/@findEmailModule/searchEmail";
import { UserRepository } from "../../repositories/user/UserRepository";

class UserService {
  private UserRepository;
  constructor(UserRepository: UserRepository) {
    this.UserRepository = UserRepository;
  }

  async executeCreate(data: User) {

    //VALIDADO OS DADOS
    if (!await new UserCore().validationData(data)) {
      return null;
    }

    //VERIFICANDO SE O EMAIL EXISTE NO DATABASE
    if (await new EmailCheckModule(data.email).find()) {
      return null;
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
    const created = this.UserRepository.create(user);
    return created;
  }


  async executeUpdate(data: User, id: string) {

    //VALIDADO OS DADOS 
    if (!await new UserCore().validationData(data)) {
        return null
    }

    //VERIFICANDO SE A CONTA EXISTE
    const userExist = await this.executeGet(id);
    if(!userExist){
        return null
    }


    //SE O USUÁRIO QUISER TROCAR O EMAIL
    if (data.email !== userExist.email) {
    //VERIFICANDO SE O NOVO EMAIL EXISTE NO DATABASE
        if (await new EmailCheckModule(data.email).find()) {
            return null
        }
    }
    
    const updated = await this.UserRepository.update(data);
    return updated

  }


  async executeGet(id: string) {

    //VERIFICANDO SE O ID É VÁLIDO
    if (!await new UserCore().validationId(id)) {
      return null;
    }

    // PROCURANDO USER E RETORNANDO
    const user = this.UserRepository.get(id);
    return user;
  }


  async executeGetByEmail(email: string) {

    //VERIFICANDO SE O EMAIL É VÁLIDO
    if (!await new UserCore().validationEmail(email)) {
      return null;
    }

    // PROCURANDO USER E RETORNANDO
    const user = await this.UserRepository.getByEmail(email);
    return user;
  }


  async executeDelete(id: string) {

        //VERIFICANDO SE O ID É VÁLIDO
        if (!await new UserCore().validationId(id)) {
            return null;
        }

        //VERIFICANDO SE O USER EXISTE, SE SIM, PODEMOS DELETAR
        if (await this.executeGet(id)) {
            await this.UserRepository.delete(id);
        }
  }
}

export { UserService };
