import { Store } from "../../interfaces/IStore";
import { StoreService } from "../../services/store/createStoreService";
import { StoreRepository } from "../../repositories/store/CreateStoreRepository";


class StoreCore {

//metodo para verificar se a loja existe
public async existStoreVerify(store:Store){

const {cnpj, email} = store
//instanciondo o StoreService passando o repositorio que faz a ligação com o bando de dados
const verify = new StoreService(new StoreRepository);
 
//verificando se a loja existe
//se o id vier vazio, a loja n existe e retornamos um false dizendo que a loja não existe
if ((await verify.executeVerifyStoreRepository(email, cnpj)).id === '') {
  return false
} 
//se então a loja existir, retornamos um true dizendo que a loja existe
return true

}


}



export {StoreCore}