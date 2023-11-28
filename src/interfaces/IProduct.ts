export type Product = {
  id: string;
  name: string;
  url_img: string[];
  price_in_cent: number;
  desc: string | null;
  category: string;
  subCategory: string;
  options: string[];
  storeId: string;
  //comments: Comments[]
};

export enum ECategoryTypes{
    esporte = "esporte",
    informatica = "informatica",
    celular = "celular",
    bebida = "bebida",
    eletrodomestico = "eletrodomestico",
    ferramenta = "ferramenta",
    brinquedo = "brinquedo",
    moda = "moda",
    automovel = "automovel",
}


export interface IProductParams{
  id: string
}

export interface IProductQuery extends IProductParams{
  name: string
  category: string
  subCategory: string
}

export interface IProductRepositories {
  create(
    name: string,
    url_img: string[],
    price_in_cent: number,
    category: string,
    subCategory: string,
    options: string[],
    storeId: string,
    desc: string | null
  ): Promise<Product>;

  getById(id: string): Promise<Product>;

  getAll(): Promise<Product[]>;

  update(newProduct: Product): Promise<Product>;
}
