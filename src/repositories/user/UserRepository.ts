import { connect, diconnect } from "../../database/database";
import { IUserRepositories, User } from "../../interfaces/IUser";
import { prisma } from "../../services/prisma/prisma";

class UserRepository implements IUserRepositories {

  public async create(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    url_img?: string | null,
    storeId?: string | null
  ): Promise<User> {
    connect();

    const created = await prisma.user
      .create({
        data: {
          first_name,
          last_name,
          url_img,
          email,
          password,
          role,
          storeId,
        },
      })
      .finally(diconnect);

    if (created) {
      return created;
    }

    return {
      id: "",
      first_name: "",
      last_name: "",
      url_img: "",
      email: "",
      password: "",
      role: "",
      storeId: "",
    };
  }

  public async getById(id: string): Promise<Partial<User>> {
    connect();

    const getByID = await prisma.user
      .findUnique({
        where: {
          id: id,
        },
      })
      .finally(diconnect);

    if (getByID !== null) {
      const {password: _pass, ...User} = getByID;
      _pass
      return User;
    }

    return {
      id: "",
      first_name: "",
      last_name: "",
      url_img: "",
      email: "",
      password: "",
      role: "",
      storeId: "",
    };
  }

  public async update(newUser: User): Promise<User> {
    const { id: __id, ...User } = newUser;
    const update = await prisma.user
      .update({
        where: { id: __id },
        data: User,
      })
      .finally(diconnect);

    if (update) {
      return update;
    }

    return {
      id: "",
      first_name: "",
      last_name: "",
      url_img: "",
      email: "",
      password: "",
      role: "",
      storeId: "",
    };
  }

  public async login(email: string): Promise<User> {
    connect();

    const login = await prisma.user
      .findUnique({ where: { email: email } })
      .finally(diconnect);

    if (login !== null) {
      return login;
    }

    return {
      id: "",
      first_name: "",
      last_name: "",
      url_img: "",
      email: "",
      password: "",
      role: "",
      storeId: "",
    };
  }
}

export { UserRepository };
