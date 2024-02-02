import { Response } from "express";
import { AdminRepository } from "../../repositories/admins/AdminRepository";
import { AdminService } from "../../services/admins/AdminService";
import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";
import { ElderService } from "../../services/elder/ElderService";
import { ElderRepository } from "../../repositories/elder/ElderRepository";


class EmailCheckModule {
  private email;
  private res;
  private findEmail: any
  constructor(email: string, res: Response) {
    this.email = email;
    this.res = res;
  }

  async find() {
  
    this.findEmail = await new AdminService(
      new AdminRepository(),
      this.res
    ).executeGetByEmail(this.email);
    if (!this.findEmail) {
      this.findEmail = await new UserService(new UserRepository()).executeGetByEmail(
        this.email
      );
      if (!this.findEmail) {
        this.findEmail = await new ElderService(new ElderRepository(), this.res).executeGetByEmail(
          this.email
        );
      }
    }

    return this.findEmail;
  }
}

export { EmailCheckModule };
