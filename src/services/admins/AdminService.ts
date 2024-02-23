import { AdminCore } from "../../core/admins/AdminCore";
import { Admin } from "../../interfaces/admins/admin";
import { AdminRepository } from "../../repositories/admins/AdminRepository";
import { EmailCheckModule } from "../../middleware/@findEmailModule/searchEmail";
import { ElderService } from "../elder/ElderService";
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { StoreService } from "../store/storeService";
import { StoreRepository } from "../../repositories/store/storeRepository";
import { DefaultServicesResponse } from "../../middleware/response.services";
import { Elder } from "../../interfaces/elder/elder";

class AdminService {

  private AdminRepository;
  constructor(AdminRepository: AdminRepository) {
    this.AdminRepository = AdminRepository;
  }

async executeCreate(data: Admin, creatorId: string): Promise<DefaultServicesResponse<Partial<Admin>>>{

     //VALIDADO OS DADOS
     if (!await new AdminCore().validationData(data)) {
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
    
    
    //VERIFICANDO SE CREATOR PODE CRIAR O ADMIN QUE DESEJA
    let creator: DefaultServicesResponse<Partial<Admin>> | DefaultServicesResponse<Partial<Elder>>;
    creator = await this.executeGet(creatorId) 
    if (!creator.data) {
      creator = await new ElderService(new ElderRepository()).executeGet(creatorId);
    }

    //VERIFICANDO SE O CRIADOR EXISTE
    if(creator.data === null){
      return {
        status: 403,
        data: null
      }
    }
  
    //VALIDANDO A ROLE
    if (!new AdminCore().validationRole(data.role, creator?.data.role)) {
       return {
        status: 1001,
        data: null
       }
    }

    //VERIFICANDO SE A STORE EXISTE
    if (!(await new StoreService(new StoreRepository()).executeGet(data.storeId)).data) {
      return {
        status: 404,
        data: null
      }
    }

    
    const hashAdmin = {
        id: '',
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: await new AdminCore().encryptPassword(data.password),
        photo: data.photo,
        role: data.role,
        storeId: await new AdminCore().StoreIdModule(creator.data, data.storeId)
    }
    const create = await this.AdminRepository.create(hashAdmin);
    return {
      data: create
    }
}

async executeUpdate(data: Admin): Promise<DefaultServicesResponse<Partial<Admin>>>{

  //VALIDADO OS DADOS 
    if (!await new AdminCore().validationData(data)) {
      return {
        status: 1001,
        data: null
      }
    }

  //VERIFICANDO SE A CONTA EXISTE
    const adminExist = await this.executeGet(data.id);
    if(!adminExist.data){
      return {
        status: 400,
        data: null
      }
    }


  //SE O USUÁRIO QUISER TROCAR O EMAIL
  if (data.email !== adminExist.data.email) {
  //VERIFICANDO SE O NOVO EMAIL EXISTE NO DATABASE
    if (await new EmailCheckModule(data.email).find()) {
        return {
          status: 400,
          data: null
        }
    }
  }

  const admin: Admin = {
    email: data.email,
    first_name: data.first_name,
    id: data.id,
    last_name: data.last_name,
    password: data.password,
    photo: data.photo,
    role: data.role,
    storeId: adminExist.data.storeId ?? ''
  }
  const updated = await this.AdminRepository.update(admin);
  return {
    data: updated
  }
  
}

async executeGetByEmail(email: string): Promise<DefaultServicesResponse<Partial<Admin>>>{
    
   //VERIFICANDO SE O EMAIL É VÁLIDO
      if (!await new AdminCore().validationEmail(email)) {
        return {
          status: 1001,
          data: null
        };
      }


   //BUSCANDO O ADMIN PELO EMAIL
      const admin = await this.AdminRepository.getByEmail(email);
      return {
        data: admin
      }
}

async executeGet(id: string): Promise<DefaultServicesResponse<Partial<Admin>>>{

    //VERIFICANDO SE O ID É VÁLIDO
    if (!await new AdminCore().validationId(id)) {
      return {
        status: 1001,
        data: null
      };
    }

    // PROCURANDO ADMIN E RETORNANDO
    const admin = await this.AdminRepository.get(id);
    return {
      data: admin
    };
}

async executeDelete(id: string): Promise<DefaultServicesResponse<void>>{

    //VERIFICANDO SE O ID É VÁLIDO
    if (!await new AdminCore().validationId(id)) {
      return {
        status: 1001,
        data: null
      };
  }

  //VERIFICANDO SE O ADMIN EXISTE, SE SIM, PODEMOS DELETAR
  if (await this.executeGet(id)) {
    return {
      status: 404,
      data: null
    }
  }


   const remove = await this.AdminRepository.delete(id);
   return {
    data: remove
   }
}

async executeLogin(email:string): Promise<DefaultServicesResponse<Partial<Admin>>>{

  //VERIFICANDO SE O EMAIL É VÁLIDO
  if (!await new AdminCore().validationEmail(email)) {
    return {
      status: 1001,
      data: null
    };
  }

  //FAZENDO LOGIN
  const login = await this.AdminRepository.login(email);
  return {
    data: login
  }
}
}

export {AdminService}