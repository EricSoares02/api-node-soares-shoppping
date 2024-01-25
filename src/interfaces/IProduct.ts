import { JsonValue } from "@prisma/client/runtime/library";

type Options = [
  value1: string[],
  value2: string[]
]

export type Product = {
  id: string;
  name: string;
  url_img: string[];
  price_in_cent: number;
  desc: string | null;
  category: string;
  subCategory: string;
  options: JsonValue;
  storeId: string;
};

export type CreateProductType = {
  name: string;
  url_img: string[];
  price_in_cent: number;
  desc: string | null;
  category: string;
  subCategory: string;
  options: Options;
  storeId: string;
}


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
    data: CreateProductType
  ): Promise<Product>;

  getById(id: string): Promise<Product>;

  getAll(): Promise<Product[]>;

  update(id: string, newProduct: CreateProductType): Promise<Product>;
}
