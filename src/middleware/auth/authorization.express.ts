import { NextFunction, Request, Response } from "express";
import { AuthenticatingUserJwt } from "./AuthenticatingUser";
import { DecodedTokenJwt } from "../decodedToken.Jwt";

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
    AuthenticatingUserJwt(DecodedTokenJwt(authorization ?? ''), res, SecurityLvl.admin, next);
  }

  public async authenticationForMaster(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { authorization } = await req.headers;
    AuthenticatingUserJwt(DecodedTokenJwt(authorization ?? ''), res, SecurityLvl.master, next);
  }

  public async authenticationForElder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { authorization } = await req.headers;
    AuthenticatingUserJwt(DecodedTokenJwt(authorization ?? ''), res, SecurityLvl.elder, next);
  }
}

export { Authorization };
