import { StoreCore } from "../../core/store/StoreCore";
import { Store } from "../../interfaces/store/store";
import { AdminRepository } from "../../repositories/admins/AdminRepository";
import { ElderRepository } from "../../repositories/elder/ElderRepository";
import { StoreRepository } from "../../repositories/store/storeRepository";
import { AdminService } from "../admins/AdminService";
import { ElderService } from "../elder/ElderService";

class StoreService {

  private StoreRepository;
  constructor(StoreRepository: StoreRepository) {
    this.StoreRepository = StoreRepository;
  }

  async executeCreate(data: Store, elderId: string) {

    //VALIDANDO OS DADOS 
        if (!await new StoreCore().validationData(data)) {
            return null
        }


    //VERIFICANDO SE QUEM ESTÁ CHAMANDO O END POINT É UM ELDER
        if (!await new ElderService(new ElderRepository()).executeGet(elderId)) {
            return null
        }


    //VERIFICANDO SE O CNPJ JÁ EXISTE NO BANCO 
        if (await this.executeGetByCnpj(data.cnpj)) {
            return null
        }


    //CRIANDO STORE 
        const create = await this.StoreRepository.create(data);
        return create;

  }


  async executeUpdate(data: Store, id: string) {

    //VALIDANDO OS DADOS 
        if (!await new StoreCore().validationData(data)) {
            return null
        }



    //VERIFICANDO SE A STORE EXISTE
        const store = await this.executeGet(data.id)
        if (!store) {
            return null
        }



    //VERIFICANDO SE QUEM ESTÁ CHAMANDO O END POINT É UM ELDER OU MASTER DA MESMA LOJA
        let user; 
        user = await new ElderService(new ElderRepository()).executeGet(id) 
    //SE NÃO ACHARMOS EM ELDER, PROCURAMOS EM ADMIN
        if (!user) {
           user = await new AdminService(new AdminRepository()).executeGet(id)
    //SE ACHARMOS EM ADMIN, VERIFICAMOS
        //SE ELE NÃO FOR UM MASTER OU SE NÃO FOR DA MESMA LOJA, RETORNAMOS NULL
           if (user?.role !== 'master' || user.storeId !== store.id) {
              return null
           }
        }

        if (!user) {
          return null
        }



    //VERIFICANDO SE O CNPJ JÁ EXISTE NO BANCO 
        const storeByCnpj = await this.executeGetByCnpj(data.cnpj)
      //AQUI VERIFICAMOS SE O CNPJ JÁ EXISTE EM OUTRA LOJA QUE NÃO ESTAMOS TENTANDO ATUALIZAAR
        if (storeByCnpj && storeByCnpj.id !== data.id ) {
            return null
        }



    //ATUALIZANDO STORE 
    const updated = await this.StoreRepository.update(data);
    return updated;

  }


  async executeGet(id: string) {


    //VALIDANDO O ID

        if (!await new StoreCore().validationId(id)) {
          return null
        }
    

    //BUSCANDO
        const store = await this.StoreRepository.get(id);
        return store;
  }


  async executeGetByCnpj(cnpj: string) {
   
    
    //VALIDANDO O CNPJ

        if (!await new StoreCore().validationCnpj(cnpj)) {
          return null
        }


    //BUSCANDO
        const store = await this.StoreRepository.getByCnpj(cnpj);
        return store;
  }


  async executeDelete(id: string) {


    //VALIDANDO O ID

        if (!await new StoreCore().validationId(id)) {
          return null
        }

    
    //VERIFICANDO SE A STORE EXISTE

          if(!await this.executeGet(id)){
            return null
          }

    //DELETANDO A STORE
        const remove = await this.StoreRepository.delete(id);
        return remove;
  }

}

export { StoreService };
