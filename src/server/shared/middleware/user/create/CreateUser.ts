import { Response } from "express";
import { IUser } from "../../../model/user/User";
import connect from "../../../../database";
import { prisma } from "../../../services/prisma/prisma";
import { createUserService } from "../../../services/user/createUser";
import { string, z } from "zod";

const UserSchema = z.object({
    
first_name: z.string().min(3),
last_name: z.string().min(3),
url_img: z.string().url().optional(),
email: z.string().email(),
password: string(), 

});

export const CreateUserMiddleware = (user: IUser, res: Response) => {

  UserSchema.parse(user);
  const { email } = user;
  async function VerifyUserExist(email: string) {
    try {
      connect();
      const verify = await prisma.user.findFirst({
        where: { email: email },
      });

      if (verify) {
        throw res.send(`exist a user with this email: ${email}`);
      }
      createUserService(user, res);
    } catch (error) {
      res.json({ message: "internal verify error" }).status(500);
    } finally {
      await prisma.$disconnect();
    }
  }

  VerifyUserExist(email);
};
