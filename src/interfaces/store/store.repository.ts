import { Store } from "./store"

export interface IStoreRepository {

    create(data: Store): Promise<Store>

    update(data: Store): Promise<Store>

    get(id:string): Promise<Store | null>

    getByCnpj(cnpj:string): Promise<Store | null>

    delete(id: string): Promise<Store>

}