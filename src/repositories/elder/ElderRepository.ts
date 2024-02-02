import { connect, diconnect } from "../../database/database";
import { Elder } from "../../interfaces/elder/elder";
import { IElderRepository } from "../../interfaces/elder/elder.repository";
import { prisma } from "../../services/prisma/prisma";


class ElderRepository implements IElderRepository {


async create(data: Elder): Promise<Partial<Elder>> {
    
    connect()
    const created = await prisma.elder.create({
        data
    }).finally(diconnect)

    const {password: password, ...hashCreated} = created
    password
    return hashCreated
}


async update(dataa: Elder): Promise<Partial<Elder>> {
    connect()
    const {id: id, ...data}=dataa
    const updated = await prisma.elder.update({
        where: {
            id
        },
        data
    }).finally(diconnect)

    const {password: password, ...hashUpdated} = updated
    password
    return hashUpdated
}

async get(id: string): Promise<Partial<Elder> | null> {
    connect()
    const elder = await prisma.elder.findFirst({
        where: {
            id
        }
    }).finally(diconnect)

    if(!elder){
        return elder
    }
    const {password: password, ...hashElder} = elder
    password
    return hashElder
}

async getByEmail(email: string): Promise<Partial<Elder> | null> {
    connect()
    const elder = await prisma.elder.findFirst({
        where: {
            email
        }
    }).finally(diconnect)

    if(!elder){
        return elder
    }
    const {password: password, ...hashElder} = elder
    password
    return hashElder
}

async delete(id: string): Promise<void> {
    connect()
    await prisma.elder.delete({
        where: {
            id
        }
    }).finally(diconnect) 
    return 
}

}

export { ElderRepository }