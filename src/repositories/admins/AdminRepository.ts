import { connect, diconnect } from "../../database/database";
import { Admin } from "../../interfaces/admins/admin";
import { IAdminRepository } from "../../interfaces/admins/admin.repository";
import { prisma } from "../../services/prisma/prisma";

class AdminRepository implements IAdminRepository{

   async create(data: Admin): Promise<Partial<Admin>>  {
        connect();
        const created = await prisma.admin.create({
            data
            }
        ).finally(diconnect);
        const {password: pass, ...hashAdmin} = created;
        pass
        return hashAdmin  
    }

    async update(dataa: Admin): Promise<Partial<Admin>>  {
        const {id: id, ...data} = dataa
        connect();
        const updated = await prisma.admin.update({
            where: {
                id
            },
            data
            }
        ).finally(diconnect);
        const {password: pass, ...hashAdmin} = updated;
        pass
        return hashAdmin  
    }

   async get(id: string): Promise<Partial<Admin> | null> {

        connect();
        const admin = await prisma.admin.findFirst({
            where: {
                id
            }
            }
        ).finally(diconnect);
        if (!admin) {
            return admin
        }
        const {password: pass, ...hashAdmin} = admin;
        pass
        return hashAdmin  
    }

    async getByEmail(email: string): Promise<Partial<Admin> | null> {

        connect();
        const admin = await prisma.admin.findFirst({
            where: {
                email
            }
            }
        ).finally(diconnect);
        
        if (!admin) {
            return admin
        }
        const {password: pass, ...hashAdmin} = admin;
        pass
        return hashAdmin  
    }

    async delete(id: string): Promise<void> {
        connect();
        await prisma.admin.delete({
            where: {
                id
            }
            }
        ).finally(diconnect);

        return
    }

    async login(email: string): Promise<Admin | null>{
        connect();
        const admin = await prisma.admin.findFirst({
            where: {
                email
            }
            }
        ).finally(diconnect);
        
        return admin 
    }
}
export {AdminRepository}