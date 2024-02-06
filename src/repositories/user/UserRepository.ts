import { connect, diconnect } from "../../database/database";
import { User } from "../../interfaces/user/user";
import { IUserRepository } from "../../interfaces/user/user.repository";
import { prisma } from "../../services/prisma/prisma";

class UserRepository implements IUserRepository {
  
async create(data: User): Promise<Partial<User>> {
    connect();

    const created = await prisma.user
      .create({
        data,
      })
      .finally(diconnect);

    const { password: password, ...hashCreated } = created;
    password;
    return hashCreated;
  }

async update(data: User): Promise<Partial<User>> {
    const { id: id, ...User } = data;
    const updated = await prisma.user
      .update({
        where: { id },
        data: User,
      })
      .finally(diconnect);

    const { password: password, ...hashUpdated } = updated;
    password;
    return hashUpdated;
  }

async get(id: string): Promise<Partial<User> | null> {
    connect();

    const user = await prisma.user
      .findFirst({
        where: {
          id,
        },
      })
      .finally(diconnect);

    if (!user) {
      return user;
    }
    const { password: password, ...hashUser } = user;
    password;
    return hashUser;
  }

async getByEmail(email: string): Promise<Partial<User> | null> {
    connect();

    const user = await prisma.user
      .findFirst({
        where: {
          email,
        },
      })
      .finally(diconnect);

    if (!user) {
      return user;
    }
    const { password: password, ...hashUser } = user;
    password;
    return hashUser;
  }

async delete(id: string): Promise<void> {
    connect();
    await prisma.user
      .delete({
        where: {
          id,
        },
      })
      .finally(diconnect);
    return;
  }
}

export { UserRepository };
