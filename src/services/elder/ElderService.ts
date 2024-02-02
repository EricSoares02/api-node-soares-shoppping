import { ElderCore } from "../../core/elder/ElderCore";
import { Elder } from "../../interfaces/elder/elder";
import { ElderRepository } from "../../repositories/elder/ElderRepository";


class ElderService{

    private ElderRepository

    constructor(ElderRepository: ElderRepository){
        this.ElderRepository = ElderRepository

    }

    async executeCreate(data: Elder){

        //VALIDADO OS DADOS 
        new ElderCore().validationData(data).catch((error)=>{
            return error
        })

        //CRIANDO O ELDER E RETORNANDO
        const created = await this.ElderRepository.create(data);
        return created
    }

    async executeUpdate(data: Elder){
        const updated = await this.ElderRepository.update(data);
        return updated
    }

    async executeGetByEmail(email: string){

        //VERIFICANDO SE O EMAIL É VÁLIDO 
        new ElderCore().validationEmail(email).catch((error)=>{
            return error
        });
        // PROCURANDO ELDER E RETORNANDO 
        const elder = await this.ElderRepository.getByEmail(email);
        return elder
    }

    async executeGet(id: string){

        //VERIFICANDO SE O ID É VÁLIDO 
        new ElderCore().validationId(id).catch((error)=>{
            return error
        })

        // PROCURANDO ELDER E RETORNANDO
        const elder = await this.ElderRepository.get(id);
        return elder
    }

    async executeDelete(id: string){
        //VERIFICANDO SE O ID É VÁLIDO 
        new ElderCore().validationId(id).catch((error)=>{
            return error
        })

        //VERIFICANDO SE O ELDER EXISTE, SE SIM, PODEMOS DELETAR
        const elder = await this.executeGet(id);
        if (elder) {
            await this.ElderRepository.delete(id); 
        }
        
    }

}

export {ElderService}