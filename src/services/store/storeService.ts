import { StoreCore } from "../../core/store/StoreCore";
import { Store } from "../../interfaces/store/store";
import { DefaultServicesResponse } from "../../middleware/response.services";
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

  async executeCreate(data: Store, elderId: string): Promise<DefaultServicesResponse<Store>> {

    //VALIDANDO OS DADOS 
        if (!await new StoreCore().validationData(data)) {
            return {
              status: 1001,
              data: null
            }
        }


    //VERIFICANDO SE QUEM ESTÁ CHAMANDO O END POINT É UM ELDER
        const elder = await new ElderService(new ElderRepository()).executeGet(elderId)
        if (!elder.data) {
            return {
              status: 403,
              data: null
            }
        }


    //VERIFICANDO SE O CNPJ JÁ EXISTE NO BANCO 
        if ((await this.executeGetByCnpj(data.cnpj)).data) {
            return {
              status: 400,
              data: null
            }
        }


    //CRIANDO STORE 
        const create = await this.StoreRepository.create(data);
        return {
          data: create
        };

  }


  async executeUpdate(data: Store, id: string): Promise<DefaultServicesResponse<Store>>  {

    //VALIDANDO OS DADOS 
        if (!await new StoreCore().validationData(data)) {
            return {
              status: 1001,
              data: null
            }
        }



    //VERIFICANDO SE A STORE EXISTE
        const store = await this.executeGet(data.id)
        if (!store.data) {
            return {
              status: 400,
              data: null
            }
        }



    //VERIFICANDO SE QUEM ESTÁ CHAMANDO O END POINT É UM ELDER OU MASTER DA MESMA LOJA
        let user; 
        user = await new ElderService(new ElderRepository()).executeGet(id) 
    //SE NÃO ACHARMOS EM ELDER, PROCURAMOS EM ADMIN
        if (!user.data) {
           user = await new AdminService(new AdminRepository()).executeGet(id)
    //SE ACHARMOS EM ADMIN, VERIFICAMOS
        //SE ELE NÃO FOR UM MASTER OU SE NÃO FOR DA MESMA LOJA, RETORNAMOS NULL
           if (user.data && user?.data.role !== 'master' || user.data && user.data.storeId !== store.data.id) {
              return {
                status: 403,
                data: null
              }
           }
        }

        if (!user.data) {
          return {
            status: 403,
            data: null
          }
        }



    //VERIFICANDO SE O CNPJ JÁ EXISTE NO BANCO 
        const storeByCnpj = await this.executeGetByCnpj(data.cnpj)
      //AQUI VERIFICAMOS SE O CNPJ JÁ EXISTE EM OUTRA LOJA QUE NÃO ESTAMOS TENTANDO ATUALIZAAR
        if (storeByCnpj.data && storeByCnpj.data.id !== data.id ) {
            return {
              status: 400,
              data: null
            }
        }



    //ATUALIZANDO STORE 
      const updated = await this.StoreRepository.update(data);
      return {
        data: updated
      };

  }


  async executeGet(id: string): Promise<DefaultServicesResponse<Store>>  {


    //VALIDANDO O ID

        if (!await new StoreCore().validationId(id)) {
          return {
            status: 1001,
            data: null
          }
        }
    

    //BUSCANDO
        const store = await this.StoreRepository.get(id);
        return {
          data: store
        };
  }


  async executeGetByCnpj(cnpj: string): Promise<DefaultServicesResponse<Store>>  {
   
    
    //VALIDANDO O CNPJ

        if (!await new StoreCore().validationCnpj(cnpj)) {
          return {
            status: 1001,
            data: null
          }
        }


    //BUSCANDO
        const store = await this.StoreRepository.getByCnpj(cnpj);
        return {
          data: store
        };
  }


  async executeDelete(id: string, elderId: string): Promise<DefaultServicesResponse<Store>>  {


    //VALIDANDO O ID

        if (!await new StoreCore().validationId(id)) {
          return {
            status: 1001,
            data: null
          }
        }

    
    //VERIFICANDO SE A STORE EXISTE

          if(!(await this.executeGet(id)).data){
            return {
              status: 404,
              data: null
            }
          }


    //VALIDANDO O ID

        if (!await new StoreCore().validationId(elderId)) {
          return {
            status: 1001,
            data: null
          }
        }

    //VERIFICANDO SE QUEM ESTÁ CHAMANDO O END POINT É UM ELDER
        const elder = await new ElderService(new ElderRepository()).executeGet(elderId)
        if (!elder.data) {
            return {
              status: 403,
              data: null
            }
        }


    //DELETANDO A STORE
        const remove = await this.StoreRepository.delete(id);
        return {
          data: remove
        };
  }

}

export { StoreService };
