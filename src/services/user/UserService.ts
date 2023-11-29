import { UserRepository } from "../../repositories/user/UserRepository";

class UserService {
  constructor(private UserRepository: UserRepository) {}

  public async create(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    url_img?: string | null,
    storeId?: string
  ) {
    const created = this.UserRepository.create(
      first_name,
      last_name,
      email,
      password,
      role,
      url_img,
      storeId
    );

    return created;
  }

  public async getById(id: string){

    const product = this.UserRepository.getById(id);
    return product;

  }
  public async login(email: string){

    const Login = this.UserRepository.login(email)
    return Login
  }
}

export { UserService };
