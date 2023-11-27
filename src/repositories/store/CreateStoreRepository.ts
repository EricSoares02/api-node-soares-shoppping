import {connect, diconnect} from "../../database/database";
import { IStoreRepositories, Store } from "../../interfaces/IStore";
import { prisma } from "../../services/prisma/prisma";

class StoreRepository implements IStoreRepositories{

 public async create(name: string, email: string, password: string, url_img: string, cnpj: number, desc: string | null): Promise<Store> {
    
    connect()
    const createStore = await prisma.store.create({
        data:{
            name,
            cnpj,
            email,
            password,
            url_img,
            desc,
        }
    }).finally( diconnect )
    
    return createStore
}

public async getById(id: string): Promise<Store> {
connect()
const getStoreById = await prisma.store.findUnique({
    where: {id}
}).finally( diconnect )

if (getStoreById) {
  return getStoreById  
}

return {
    id: "",
    name: "",
    cnpj: 0,
    email: "",
    password: "",
    url_img: "",
    desc: ""
}
}

public async update(newStore: Store): Promise<Store> {

    connect()
const updateStore = await prisma.store.update({
    where: {id: newStore.id},
    data: newStore
}).finally( diconnect )

return updateStore

}

public async verify(email: string, cnpj: number): Promise<Store>{

    connect()
    const getStoreByEmailOrCNPJ = await prisma.store.findFirst({
        where: {
            OR: [
              {
                email: email,
              },
              {
                cnpj: cnpj,
              },
            ],
          },
    }).finally( diconnect )
    
    if (getStoreByEmailOrCNPJ) {
      return getStoreByEmailOrCNPJ
    }
    
    return {
        id: "",
        name: "",
        cnpj: 0,
        email: "",
        password: "",
        url_img: "",
        desc: ""
    }

}

}

export { StoreRepository }