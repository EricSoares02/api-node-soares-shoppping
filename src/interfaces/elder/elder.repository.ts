import { Elder } from "./elder";


export interface IElderRepository {


    create(data: Elder): Promise<Partial<Elder>>

    update(data: Elder): Promise<Partial<Elder>>

    get(id: string): Promise<Partial<Elder> | null>

    getByEmail(email: string): Promise<Partial<Elder> | null>

    delete(id: string): Promise<void>

}
