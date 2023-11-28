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
