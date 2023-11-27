
export type Store = {
  id: string;
  name: string;
  email: string;
  password: string;
  url_img: string;
  cnpj: number;
  desc: string | null;
  //products Product[]
};

export interface IStoreRepositories {

    create(name: string, email: string, password: string, url_img: string, cnpj: number, desc: string | null): Promise<Store>

    getById(id:string): Promise<Store>

    update(newStore: Store): Promise<Store>

}
