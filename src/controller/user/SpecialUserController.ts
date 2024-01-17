import { NextFunction, Request, Response } from "express";
import { EEspecialRole, User } from "../../interfaces/IUser";
import { ValidationData } from "../../middleware/validationData.Zod";
import { z } from "zod";
import { UserCore } from "../../core/user/UserCore";
import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";
import { BadRequest, InternalError, Unauthorized } from "../../middleware/errors.express";
import { ResponseToCreated } from "../../middleware/Response.express";
import { GetIdByJwtToken } from "../../middleware/getIdByToken.Jwt";


const RoleSchema = z.nativeEnum(EEspecialRole);

const SpecialUserSchema = z.object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    url_img: z.string().min(3).optional(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.nativeEnum(EEspecialRole),
    storeId: z.string().min(24),
  });


class SpecialUserController{

public async validationRolePost(
        req: Request<"", "", User>,
        res: Response,
        next: NextFunction
      ) {
        //primeiro precisamos validar a role do user a ser criado
        //então colocamos a role em uma objeto que a função ValidationData aceita
        const data = { data: req.body.role } ?? "user";
        //chamamos a função ValidationData e passamos o schema que queremos, o data e a função next. assim validando a role
        ValidationData(RoleSchema, data, next);
}  

public async verifyPostUser(req: Request<"", "", User>,
res: Response,
next: NextFunction){

    const user = req.body;

    switch (user.role) {
      case "admin":
        return ValidationData(SpecialUserSchema, { data: user }, next);
      case "master":
        return ValidationData(SpecialUserSchema, { data: user }, next);
      default:
        return new InternalError("Internal Server Error", res).returnError();
    }

}

public async create(req: Request<"", "", User>, res: Response) {
    
    const core = new UserCore();


    const token = await new UserCore().decodedToken(
        req.headers.authorization ?? ""
        );  
    const id = await GetIdByJwtToken(token);
    if (id === null) {
        return new Unauthorized('token is required', res).returnError();
    }

    const creatorExist = await new UserService(new UserRepository()).executeGetByIdUserRepository(id);
    const { first_name, last_name, email, password, role, storeId, url_img} = req.body;

    //verificando se o user existe
    const userExit = await core.verifyUser(email);
    // verificando se a loja existe
    const storeExist = await core.verifyStore(storeId ?? '');
    // se user já existe, store não existe ou creator não existe disparamos um erro
    if (userExit || !storeExist || !creatorExist) {
      return new BadRequest("You cannot create this user", res).returnError();
    }


    const verifyRole = await core.verifyRoleToCreateUser(role, id);
      //se algo estiver incorreto com as roles, disparamos um erro
      if (!verifyRole || verifyRole === undefined) {
        return new BadRequest(
          "Something wrong with role",
          res
        ).returnError();
      }




    //encriptamos a senha
    const hashPassword = await core.encryptPassword(password);
    // chamamos o service e criamos o user
    const created = await new UserService(
      new UserRepository()
    ).executeCreateUserRepository(
      first_name,
      last_name,
      email,
      hashPassword,
      role,
      url_img,
      storeId
    );

    //se o id for diferente de vazio, significa que user foi criado e retornamos a resposta da requisição
    if (created.id !== "") {
      const response = new ResponseToCreated(created);
      response.res(res);
      // se a user não existe, retornamos um erro
    } else {
      return new BadRequest("This User does not created", res).returnError();
    }
}


}

export { SpecialUserController}