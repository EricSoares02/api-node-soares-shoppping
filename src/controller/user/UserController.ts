import { NextFunction, Request } from "express";
import { ERole, IUserParams, User } from "../../interfaces/IUser";
import { ValidationData } from "../../middleware/validationData.Zod";
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().min(24),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  url_img: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(ERole),
  storeId: z.string().min(24).optional(),
});

const IdSchema = z.string().min(24);

class UserController {
    
  public validationUserPost(
    req: Request<"", "", User>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(UserSchema, data, next);
  }

  public validationUserGet(
    req: Request<IUserParams>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.params.id };
    ValidationData(IdSchema, data, next);
  }
}

export { UserController };
