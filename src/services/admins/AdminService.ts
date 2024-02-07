import { AdminCore } from "../../core/admins/AdminCore";
import { Admin } from "../../interfaces/admins/admin";
import { AdminRepository } from "../../repositories/admins/AdminRepository";
import { EmailCheckModule } from "../../middleware/@findEmailModule/searchEmail";
import { ElderService } from "../elder/ElderService";
import { ElderRepository } from "../../repositories/elder/ElderRepository";

class AdminService {

  private AdminRepository;
  constructor(AdminRepository: AdminRepository) {
    this.AdminRepository = AdminRepository;
  }

async executeCreate(data: Admin, creatorId: string){

     //VALIDADO OS DADOS
     if (!await new AdminCore().validationData(data)) {
      return null;
    }


    //VERIFICANDO SE O EMAIL EXISTE NO DATABASE
    if (await new EmailCheckModule(data.email).find()) {
      return null;
    }
    
    
    //VERIFICANDO SE CREATOR PODE CRIAR O ADMIN QUE DESEJA
    let creator
    creator = await this.executeGet(creatorId) 
    if (!creator) {
      creator = await new ElderService(new ElderRepository()).executeGet(creatorId);
    }

    //VERIFICANDO SE O CRIADOR EXISTE
    if(creator === null){
      return creator
    }
  
    //VALIDANDO A ROLE
    if (!new AdminCore().validationRole(data.role, creator?.role)) {
       return null
    }


    const hashAdmin = {
        id: '',
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: await new AdminCore().encryptPassword(data.password),
        photo: data.photo,
        role: data.role,
        storeId: await new AdminCore().StoreIdModule(creator, data.storeId)
    }
    const create = this.AdminRepository.create(hashAdmin);
    return create
}

async executeUpdate(data: Admin, id: string){

  //VALIDADO OS DADOS 
    if (!await new AdminCore().validationData(data)) {
      return null
    }

  //VERIFICANDO SE A CONTA EXISTE
    const adminExist = await this.executeGet(id);
    if(!adminExist){
      return null
    }


  //SE O USUÁRIO QUISER TROCAR O EMAIL
  if (data.email !== adminExist.email) {
  //VERIFICANDO SE O NOVO EMAIL EXISTE NO DATABASE
    if (await new EmailCheckModule(data.email).find()) {
        return null
    }
  }

  const updated = await this.AdminRepository.update(data);
  return updated
  
}

async executeGetByEmail(email: string){
    
   //VERIFICANDO SE O EMAIL É VÁLIDO
   if (!await new AdminCore().validationEmail(email)) {
    return null;
  }
    //BUSCANDO O ADMIN PELO EMAIL
    const admin = await this.AdminRepository.getByEmail(email);
    return admin
}

async executeGet(id: string){

    //VERIFICANDO SE O ID É VÁLIDO
    if (!await new AdminCore().validationId(id)) {
      return null;
    }

    // PROCURANDO ADMIN E RETORNANDO
    const admin = this.AdminRepository.get(id);
    return admin;
}

async executeDelete(id: string){

    //VERIFICANDO SE O ID É VÁLIDO
    if (!await new AdminCore().validationId(id)) {
      return null;
  }

  //VERIFICANDO SE O ADMIN EXISTE, SE SIM, PODEMOS DELETAR
  if (await this.executeGet(id)) {
      await this.AdminRepository.delete(id);
  }
}

async executeLogin(email:string){

  //VERIFICANDO SE O EMAIL É VÁLIDO
  if (!await new AdminCore().validationEmail(email)) {
    return null;
  }

  //FAZENDO LOGIN
  const login = await this.AdminRepository.login(email);
  return login
}
}

export {AdminService}