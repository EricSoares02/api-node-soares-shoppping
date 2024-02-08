type StoreType = {
  id: string;
  name: string;
  photo: string;
  cnpj: string;
  desc: string | null;
};

class Store implements StoreType {
  cnpj: string;
  desc: string | null;
  id: string;
  name: string;
  photo: string;

  constructor(data: StoreType) {
    this.cnpj = data.cnpj;
    this.desc = data.desc;
    this.id = data.id;
    this.name = data.name;
    this.photo = data.photo;
  }

}

export { Store, StoreType };
