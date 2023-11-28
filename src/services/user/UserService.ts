import { UserRepository } from "../../repositories/user/UserRepository";

class UserService {
  constructor(private UserRepository: UserRepository) {}

  public async create(
    first_name: string,
    last_name: string,
    url_img: string,
    email: string,
    password: string,
    role: string,
    storeId?: string
  ) {
    const created = this.UserRepository.create(
      first_name,
      last_name,
      url_img,
      email,
      password,
      role,
      storeId
    );

    return created;
  }

  
}

export { UserService };
