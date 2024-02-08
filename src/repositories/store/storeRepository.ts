import { connect, diconnect } from "../../database/database";
import { Store } from "../../interfaces/store/store";
import { IStoreRepository } from "../../interfaces/store/store.repository";
import { prisma } from "../../services/prisma/prisma";

class StoreRepository implements IStoreRepository {
  
  async create(data: Store): Promise<Store> {

        connect();
        const createStore = await prisma.store
        .create({
            data,
        })
        .finally(diconnect);

        return createStore;

  }


  async update(data: Store): Promise<Store> {
      
        connect()
        const updated = await prisma.store.update({
            where: {id: data.id},
            data
        }).finally( diconnect )
    
        return updated
  }


  async get(id: string): Promise<Store | null> {
      
        connect()
        const store = await prisma.store.findFirst({
            where: {id}
        }).finally( diconnect )


        return store

  }


  async getByCnpj(cnpj: string): Promise<Store | null> {
    
        connect()
        const store = await prisma.store.findFirst({
            where: {cnpj}
        }).finally( diconnect )


        return store

  }


  async delete(id: string): Promise<void> {
      
        connect()
        const store = await prisma.store.delete({
            where: {id}
        }).finally( diconnect )

        store
        return 
  }

}

export { StoreRepository };
