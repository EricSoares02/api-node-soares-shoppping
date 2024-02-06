type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  photo?: string | null;
  email: string;
  password: string;
};

class User implements UserType {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  password: string;
  photo?: string | null;

  constructor(data: UserType) {
    this.email = data.email;
    this.first_name = data.first_name;
    this.id = data.id;
    this.last_name = data.last_name;
    this.password = data.password;
    this.photo = data.photo;
  }
}

export { User, UserType };