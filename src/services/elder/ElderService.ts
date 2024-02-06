import { ElderCore } from "../../core/elder/ElderCore";
import { Elder } from "../../interfaces/elder/elder";
import { EmailCheckModule } from "../../middleware/@findEmailModule/searchEmail";
import { ElderRepository } from "../../repositories/elder/ElderRepository";


class ElderService{

    private ElderRepository
    constructor(ElderRepository: ElderRepository){
        this.ElderRepository = ElderRepository
    }

    async executeCreate(data: Elder, creatorId: string){
       
        //VALIDADO OS DADOS 
        if (!await new ElderCore().validationData(data)) {
            return null
        }

        //VERIFICANDO SE O EMAIL EXISTE NO DATABASE
        if (await new EmailCheckModule(data.email).find()) {
            return null
        }

        //VERIFICANDO SE O CRIADOR É UM ELDER
        if(!await this.executeGet(creatorId)){
            return null
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
        return created
    }

    async executeUpdate(data: Elder, Id: string){

        //VALIDADO OS DADOS 
        if (!await new ElderCore().validationData(data)) {
            return null
        }

        //VERIFICANDO SE A CONTA EXISTE
        const elderExist = await this.executeGet(Id);
        if(!elderExist){
            return null
        }


        //SE O USUÁRIO QUISER TROCAR O EMAIL
        if (data.email !== elderExist.email) {
        //VERIFICANDO SE O NOVO EMAIL EXISTE NO DATABASE
            if (await new EmailCheckModule(data.email).find()) {
                return null
            }
        }
        
        const updated = await this.ElderRepository.update(data);
        return updated
    }

    async executeGetByEmail(email: string){

        //VERIFICANDO SE O EMAIL É VÁLIDO 
       if (!await new ElderCore().validationEmail(email)) {
        return null
       } 

        // PROCURANDO ELDER E RETORNANDO 
        const elder = await this.ElderRepository.getByEmail(email);
        return elder
    }

    async executeGet(id: string){

        //VERIFICANDO SE O ID É VÁLIDO 
        if(!await new ElderCore().validationId(id)){
            return null
        }

        // PROCURANDO ELDER E RETORNANDO
        const elder = await this.ElderRepository.get(id);
        return elder
    }

    async executeDelete(id: string){
        
         //VERIFICANDO SE O ID É VÁLIDO 
         if(!await new ElderCore().validationId(id)){
            return null
        }

        //VERIFICANDO SE O ELDER EXISTE, SE SIM, PODEMOS DELETAR
        if (await this.executeGet(id)) {
            await this.ElderRepository.delete(id); 
        }
        
    }

}

export {ElderService}