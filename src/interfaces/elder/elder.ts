type ElderType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
};


class Elder implements ElderType {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  password: string;
  role: string;

  constructor(data: ElderType){
    this.email = data.email
    this.first_name = data.first_name
    this.id = data.id
    this.last_name = data.last_name
    this.password = data.password
    this.role = data.role
  }
}

export { ElderType, Elder}