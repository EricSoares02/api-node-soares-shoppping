import { NextFunction, Request, Response } from "express";
import { BadRequest, InternalError, Unauthorized } from "./errors.express";
import Jwt from "jsonwebtoken";
import { UserService } from "../services/user/UserService";
import { UserRepository } from "../repositories/user/UserRepository";
import { User } from "../interfaces/IUser";

// type JwtPayload = {
//   id: string;
// };

function verifyAuthorizedUser(securityLvl: number, user: Partial<User>) {
  switch (securityLvl) {
    case 1:
      if (user.role === "admin") {
        return true;
      }
      return false;
      break;
    case 2:
      if (user.role === "master") {
        return true;
      }
      return false;
      break;
    case 3:
      if (
        user.role === "elder"
      ) {
        return true;
      }
      return false;
      break;
    default:
      return false;
      break;
  }
}

class Authorization {
  constructor(private securityLvl: number) {
    this.securityLvl;
  }

  public async authentication(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return new Unauthorized("unauthorized", res).returnError;
    }

    const token = authorization.split(" ")[1];

    Jwt.verify(token, process.env.JWT_PASS ?? "", async (err, decoded) => {
      if (err) {
        return new Unauthorized(err.message, res).returnError;
      }

      const id = decoded?.search("id");

      if (!id) {
        return new InternalError("Internel server error", res);
      } else {
        const user = await new UserService(
          new UserRepository()
        ).executeGetByIdUserRepository(id);

        if (!user) {
          return new BadRequest("The User does not exist", res).returnError();
        }

        const auto = verifyAuthorizedUser(this.securityLvl, user);
        if (auto) {
          next();
        } else {
          return new Unauthorized("unauthorized", res).returnError;
        }
      }
    });
  }
}

export { Authorization, verifyAuthorizedUser };
