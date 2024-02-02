import { Admin } from "./admin";

export interface IAdminRepository{

    create(data: Admin):Promise<Partial<Admin>> 

    update(data: Admin):Promise<Partial<Admin>> 

    get(id: string):Promise<Partial<Admin> | null> 
    
    getByEmail(email: string):Promise<Partial<Admin> | null> 

    delete(id: string):Promise<void>

    
}