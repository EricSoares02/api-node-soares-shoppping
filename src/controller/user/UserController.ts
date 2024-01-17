import { NextFunction, Request, Response } from "express";
import {
  ENormalRole,
  ILogin,
  User,
} from "../../interfaces/IUser";
import { ValidationData } from "../../middleware/validationData.Zod";
import { Schema, z } from "zod";
import Jwt from "jsonwebtoken";
import { UserCore } from "../../core/user/UserCore";
import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";
import { BadRequest, InternalError } from "../../middleware/errors.express";
import {
  ResponseGet,
  ResponseToCreated,
} from "../../middleware/Response.express";

const RoleSchema = z.nativeEnum(ENormalRole);
const SchemaGetUser = z.string().min(15);

const Login = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type JwtPayload = {
  id: string;
};

const DefaultUserSchema = z.object({
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  url_img: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(ENormalRole),
});


class UserController {
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

  public async validationUserPost(
    req: Request<"", "", User>,
    res: Response,
    next: NextFunction
  ) {
    const user = req.body;

    switch (user.role) {
      case "user":
        return ValidationData(DefaultUserSchema, { data: user }, next);
      case "elder":
        return ValidationData(DefaultUserSchema, { data: user }, next);
      default:
        return new InternalError("Internal Server Error", res).returnError();
    }
  }

  public async create(req: Request<"", "", User>, res: Response) {

    
    const core = new UserCore();
    const { first_name, last_name, email, password, role, url_img} = req.body;

    //verificando se o user existe
    const userExit = await core.verifyUser(req.body.email);
    // se user já existe, disparamos um erro
    if (userExit || role !== 'user') {
      return new BadRequest("You cannot create this user", res).returnError();
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
      url_img
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

  public async validationUserGet(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = req.headers.authorization ?? "";

    function ValidationDataToGetUser(
      Schema: Schema,
      next: NextFunction,
      data?: string
    ) {
      try {
        Schema.parse(data);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log("Some property is wrong or missing: " + error.issues);
        }
        next(error);
      }
    }

    ValidationDataToGetUser(SchemaGetUser, next, data);
  }

  public async getById(req: Request, res: Response) {
    const token = await new UserCore().decodedToken(
      req.headers.authorization ?? ""
    );

    const { id } = Jwt.decode(token) as JwtPayload;

    //buscando o user com o metodo executeGetByIdUserRepository no UserService e passando o UserRepository como parametro.
    const user = await new UserService(
      new UserRepository()
    ).executeGetByIdUserRepository(id);
    //se o produto existe, o enviamos como resposta da requisição
    if (user.id !== "") {
      const response = new ResponseGet(user);
      response.res(res);
    } else {
      return new BadRequest("The User does not exist", res).returnError();
    }
  }

  public async validationUserLogin(
    req: Request<"", "", ILogin>,
    res: Response,
    next: NextFunction
  ) {
    const user = { data: req.body };

    ValidationData(Login, user, next);
  }

  public async login(req: Request<"", "", ILogin>, res: Response) {
    const core = new UserCore();
    const { email, password } = req.body;

    //verificando se o user existe
    const userExit = await core.verifyUser(email);
    // se user não existe, disparamos um erro
    if (!userExit) {
      return new BadRequest("This User dont exist", res).returnError();
    }

    //verificando se a password está correta com a do banco
    const verifyPass = await core.comparePassword(email, password);
    //se o resultado do metodo for false, a senha está errada então disparamos um erro
    if (!verifyPass) {
      return new BadRequest("Wrong password", res).returnError();
    }

    //criando token de autenticação
    const login = await core.login(email);
    //se o produto existe, o enviamos junto ao token como resposta da requisição
    if (login.user.first_name !== "") {
      const response = new ResponseGet(login);
      response.res(res);
    } else {
      return new BadRequest("The User does not exist", res).returnError();
    }
  }
}

export { UserController };
