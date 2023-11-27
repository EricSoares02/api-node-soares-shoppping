import { StoreRepository } from "../../repositories/store/CreateStoreRepository";

class StoreService {
  constructor(private StoreRepository: StoreRepository) {}

  public async executeCreateStoreRepository(
    id: string,
    name: string,
    email: string,
    password: string,
    url_img: string,
    cnpj: number,
    desc: string | null
  ) {

    const create = await this.StoreRepository.create(name, email, password, url_img, cnpj, desc)
    return create
  }

  public async executeVerifyStoreRepository(
  email: string,
  cnpj: number,
  
) {

  const verify = await this.StoreRepository.verify(email, cnpj)
  return verify
}

public async executeGetStoreById(storeId:string){
  const store = await this.StoreRepository.getById(storeId)
  return store
}
}


export { StoreService };
