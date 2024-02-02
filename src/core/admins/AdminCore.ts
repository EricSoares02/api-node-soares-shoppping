import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { Admin } from "../../interfaces/admins/admin";
import { EmailCheckModule } from "../../middleware/@findEmailModule/searchEmail";
import { Response } from "express";
import bcrypt from "bcrypt";

const EmailSchema = z.string().email();
const IdSchema = z.string().length(24);

enum Roles {
  admin = "admin",
  master = "master",
  elder = "elder",
}
const RoleSchema = z.nativeEnum(Roles);

const AdminSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  photo: z.string().url().optional(),
  email: EmailSchema,
  password: z.string().min(6),
  role: RoleSchema,
  storeId: IdSchema,
});

class AdminCore {
  async validationEmail(email: string) {
    return await ValidationData(EmailSchema, email);
  }

  async validationId(id: string) {
    return await ValidationData(IdSchema, id);
  }

  validationRole(role: string, creatorRole: string | undefined) {
    switch (role) {
      case "admin":
        if (creatorRole === "master" || creatorRole === "elder") {
          return true;
        }
        return false;
      case "master":
        if (creatorRole === "elder") {
          return true;
        }
        return false;
      case "elder":
        if (creatorRole === "elder") {
          return true;
        }
        return false;
      default:
        return false;
    }
  }

  async findEmailModule(email: string, res: Response) {
    return new EmailCheckModule(email, res).find();
  }

  async StoreIdModule(creator: Partial<Admin> | null, storeId: string) {
    if (creator?.storeId) {
      return creator.storeId;
    }

    if (creator?.role === "elder") {
      return storeId;
    }
  }

  async validationData(data: Admin) {
    return await ValidationData(AdminSchema, data);
  }

  async encryptPassword(password: string){
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  }
}

export { AdminCore };
