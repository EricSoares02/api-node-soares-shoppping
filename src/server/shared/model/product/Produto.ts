export interface IComments {
  id: string;
  authorId: string;
  product_commentedId: string;
  title: string;
  stars: number;

}

export enum ECategoryTypes {
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

export interface IProduto {
  id: string;
  name: string;
  url_img: string[];
  price_in_cent: number;
  desc?: string;
  category: string;
  subCategory: string;
  store: string;
  options: string[];
  comments: IComments[];
  review_numbers?: number;
}
// inserir em produto old product, store e options e tranformar url_img em array
export interface IUpdateProdutoProps {
  name?: string;
  url_img?: string;
  price_in_cent?: number;
  desc?: string;
  category?: string;
  subCategory?: string;
  store?: string;
  options?: string[];
  comments?: IComments[];
  stars?: number;
  stars_number?: number;
}
