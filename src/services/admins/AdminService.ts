import { Response } from "express";
import { AdminCore } from "../../core/admins/AdminCore";
import { Admin } from "../../interfaces/admins/admin";
import { BadRequest } from "../../middleware/errors.express";
import { AdminRepository } from "../../repositories/admins/AdminRepository";

class AdminService {

  private AdminRepository;
  private res
  constructor(AdminRepository: AdminRepository, res: Response) {
    this.AdminRepository = AdminRepository;
    this.res = res
  }

 async executeCreate(data: Admin, creatorId: string){

    //VALIDANDO OS DADOS RECEBIDOS
    new AdminCore().validationData(data).catch(()=>{
        return new BadRequest('Email is Wrong!', this.res).returnError();}
    )


    //VERIFICANDO SE EMAIL JÁ EXISTE NO BANCO 
    const adminExist = await new AdminCore().findEmailModule(data.email, this.res);
    if (adminExist) {
        return new BadRequest('This Admin Exist', this.res).returnError()
    }

    //VERIFICANDO SE CREATOR PODE CRIAR O ADMIN QUE DESEJA
    const creator = await this.executeGet(creatorId); // ADICIONAR QUE SE NÃO VIER DESSA COLLECTION, PODE VIR DA DE ELDER
    if (!new AdminCore().validationRole(data.role, creator?.role)) {
        return new BadRequest(`You Cannot Create a ${data.role}`, this.res).returnError()
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

  async executeGetByEmail(email: string){
    //VALIDADANDO O EMAIL RECEBIDO 
    new AdminCore().validationEmail(email).catch(()=>{
        return new BadRequest('Email is Wrong!', this.res).returnError();
    })
    //BUSCANDO O ADMIN PELO EMAIL
    const admin = await this.AdminRepository.getByEmail(email);
    return admin
  }

  async executeGet(id: string){

     //VALIDADANDO O ID RECEBIDO 
     new AdminCore().validationId(id).catch(()=>{
        return new BadRequest('Id is Wrong!', this.res).returnError();
    })
    //BUSCANDO O ADMIN PELO ID
    const admin = await this.AdminRepository.get(id);
    return admin
  }

}

export {AdminService}