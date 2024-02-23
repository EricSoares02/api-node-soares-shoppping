import { ElderCore } from "../../core/elder/ElderCore";
import { Elder } from "../../interfaces/elder/elder";
import { EmailCheckModule } from "../../middleware/@findEmailModule/searchEmail";
import { DefaultServicesResponse } from "../../middleware/response.services";
import { ElderRepository } from "../../repositories/elder/ElderRepository";


class ElderService{

    private ElderRepository
    constructor(ElderRepository: ElderRepository){
        this.ElderRepository = ElderRepository
    }

    async executeCreate(data: Elder, creatorId: string): Promise<DefaultServicesResponse<Partial<Elder>>>{
       
        //VALIDADO OS DADOS 
        if (!await new ElderCore().validationData(data)) {
            return {
                status: 1001,
                data: null
            }
        }
        
        //VERIFICANDO SE O EMAIL EXISTE NO DATABASE
        if (await new EmailCheckModule(data.email).find()) {
            return {
                status: 400,
                data: null
            }
        }
        
        //VERIFICANDO SE O CRIADOR É UM ELDER
        const verifyCreator = await this.executeGet(creatorId)
        if(!verifyCreator.data){
            return {
                status: 403,
                data: null
            }
        }

        //CRIANDO UM NOVO ELDER E ENCRIPTANDO A SENHA
        const elder: Elder = {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            id: data.id,
            password: await new ElderCore().encryptingPassword(data.password),
            role: data.role 
        }
      

        //CRIANDO O ELDER E RETORNANDO
        const created = await this.ElderRepository.create(elder);
        return {
            data: created
        }
    }

    async executeUpdate(data: Elder): Promise<DefaultServicesResponse<Partial<Elder>>>{

        //VALIDADO OS DADOS 
        if (!await new ElderCore().validationData(data)) {
            return {
                status: 1001,
                data: null
            }
        }

        //VERIFICANDO SE A CONTA EXISTE
        const elderExist = await this.executeGet(data.id);
        if(!elderExist.data){
            return {
                status: 404,
                data: null
            }
        }


        //SE O USUÁRIO QUISER TROCAR O EMAIL
        if (data.email !== elderExist.data.email) {
        //VERIFICANDO SE O NOVO EMAIL EXISTE NO DATABASE
            if (await new EmailCheckModule(data.email).find()) {
                return {
                    status: 400,
                    data: null
                }
            }
        }
        
        const updated = await this.ElderRepository.update(data);
        return {
            data: updated
        }
    }

    async executeGetByEmail(email: string): Promise<DefaultServicesResponse<Partial<Elder>>>{

        //VERIFICANDO SE O EMAIL É VÁLIDO 
       if (!await new ElderCore().validationEmail(email)) {
        return {
            status: 1001,
            data: null
        }
       } 

        // PROCURANDO ELDER E RETORNANDO 
        const elder = await this.ElderRepository.getByEmail(email);
        return {
            data: elder
        }
    }

    async executeGet(id: string): Promise<DefaultServicesResponse<Partial<Elder>>>{

        //VERIFICANDO SE O ID É VÁLIDO 
        if(!await new ElderCore().validationId(id)){
            return {
                status: 1001,
                data: null
            }
        }

        // PROCURANDO ELDER E RETORNANDO
        const elder = await this.ElderRepository.get(id);
        return {
            data: elder
        }
    }

    async executeDelete(id: string): Promise<DefaultServicesResponse<void>>{
        
         //VERIFICANDO SE O ID É VÁLIDO 
         if(!await new ElderCore().validationId(id)){
            return {
                status: 1001,
                data: null
            }
        }

        //VERIFICANDO SE O ELDER EXISTE, SE SIM, PODEMOS DELETAR
        const elder = await this.executeGet(id)
        if (!elder.data) {
            return {
                status: 404,
                data: null
            }
        }
        
        const remove = await this.ElderRepository.delete(id); 
        return {
            data: remove
        }
    }

    async executeLogin(email: string): Promise<DefaultServicesResponse<Partial<Elder>>>{

        //VERIFICANDO SE O EMAIL É VÁLIDO 
       if (!await new ElderCore().validationEmail(email)) {
        return {
            status: 1001,
            data: null
        }
       } 

        // FAZENDO LOGIN 
        const login = await this.ElderRepository.login(email);
        return {
            data: login
        }
    }
}

export {ElderService}