import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ILoginRepositories, User } from "../../interfaces/IUser";
import { connect, diconnect } from "../../database/database";
import { prisma } from "../../services/prisma/prisma";
import { BadRequest, NotFound } from "../../middleware/errors.express";

class Login implements ILoginRepositories {
  public async login(email: string, password: string): Promise<User> {
    connect();
    const userExist = await prisma.user
      .findUnique({ where: { email: email } })
      .finally(await diconnect);
    if (!userExist) {
      throw new NotFound("we Cannot Found this User");
    }
    const verifyPass = bcrypt.compare(password, userExist.password);
    if (!verifyPass) {
      throw new BadRequest("this user password dont exist");
    }

    return { email: "", first_name: "", id: "", last_name: "", password: "" };
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    connect();
    const userExist = await prisma.user.findUnique({ where: { email: email } });

    if (!userExist) {
      throw res.json({ message: "this user email dont exist" });
    }
    const verifyPass = bcrypt.compare(password, userExist.password);

    if (!verifyPass) {
      throw res.json({ message: "this user password dont exist" });
    }

    const token = jwt.sign({ id: userExist.id }, process.env.JWT_PASS ?? "", {
      expiresIn: "1h",
    });

    res.json({
      user: { id: userExist.id, url_img: userExist.url_img },
      token: token,
    });
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export { Login };
