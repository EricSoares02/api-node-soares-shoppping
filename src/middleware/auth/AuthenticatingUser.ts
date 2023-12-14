import { NextFunction, Response } from "express";
import Jwt from "jsonwebtoken";
import { BadRequest, InternalError, Unauthorized } from "../errors.express";
import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";
import { verifyAuthorizedUser } from "./authorizedUser.express";

type JwtPayload = {
    id: string;
  };



async function AuthenticatingUserJwt (token:string, res: Response, SecurityLvl: number, next: NextFunction){

    Jwt.verify(token, process.env.JWT_PASS ?? "", async (err, decoded) => {
      if (err) {
        return new Unauthorized(err.message, res).returnError();
      }

      const { id } = decoded as JwtPayload;
      if (!id) {
        return new InternalError("Internel server error", res).returnError();
      }

      const user = await new UserService(
        new UserRepository()
      ).executeGetByIdUserRepository(id);
      if (!user) {
        return new BadRequest("The User does not exist", res).returnError();
      }

      const auto = await new verifyAuthorizedUser(
        SecurityLvl,
        user
      ).verify();

      if (!auto) {
        return new Unauthorized("unauthorized", res).returnError();
      }
      return next();
    });
}

export {AuthenticatingUserJwt}