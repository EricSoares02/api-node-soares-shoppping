type AdminType = {
  id: string;
  first_name: string;
  last_name: string;
  photo: string | null;
  email: string;
  password: string;
  role: string;
  storeId: string;
};

class Admin implements AdminType {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  photo: string | null;
  role: string;
  storeId: string;

  constructor(data: AdminType) {
    this.email = data.email;
    this.first_name = data.first_name;
    this.id = data.id;
    this.last_name = data.last_name;
    this.password = data.password;
    this.photo = data.photo;
    this.role = data.role;
   this.storeId = data.storeId;
  }
}

export { AdminType, Admin };
