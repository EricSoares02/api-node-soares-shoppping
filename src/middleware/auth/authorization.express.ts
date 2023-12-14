import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "../errors.express";
import { AuthenticatingUserJwt } from "./AuthenticatingUser";

const SecurityLvl = {
  admin: 1,
  master: 2,
  elder: 3,
};

class Authorization {
  public async authenticationForAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { authorization } = await req.headers;
    if (authorization === undefined) {
      return new Unauthorized("unauthorized", res).returnError();
    }
    const token = authorization.split(" ")[1];

    AuthenticatingUserJwt(token, res, SecurityLvl.admin, next);
  }

  public async authenticationForMaster(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { authorization } = await req.headers;
    if (authorization === undefined) {
      return new Unauthorized("unauthorized", res).returnError();
    }
    const token = authorization.split(" ")[1];
    AuthenticatingUserJwt(token, res, SecurityLvl.master, next);
  }

  public async authenticationForElder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { authorization } = await req.headers;
    if (authorization === undefined) {
      return new Unauthorized("unauthorized", res).returnError();
    }
    const token = authorization.split(" ")[1];
    AuthenticatingUserJwt(token, res, SecurityLvl.elder, next);
  }
}

export { Authorization };
