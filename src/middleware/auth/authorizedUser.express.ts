import { User } from "../../interfaces/IUser";

class verifyAuthorizedUser {
  constructor(protected securityLvl: number, protected user: Partial<User>) {
    this.securityLvl;
    this.user;
  }

  verify() {
    switch (this.securityLvl) {
      case 1:
        if (this.user.role === "admin") {
          return true;
        }
        return false;

      case 2:
        if (this.user.role === "master") {
          return true;
        }
        return false;

      case 3:
        if (this.user.role === "elder") {
          return true;
        }
        return false;

      default:
        return false;
    }
  }
}

export { verifyAuthorizedUser };
