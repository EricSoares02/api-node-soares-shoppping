import { IStore } from "../store/Store";

interface IComments {
  id: string;
  authorId: string;
  product_commentedId: string;
  title: string;
}

export interface IProduto {
  id: string;
  name: string;
  url_img: string[];
  price_in_cent: number;
  desc?: string;
  category: string;
  subCategory: string;
  store: IStore;
  options: string[];
  comments: IComments;
  stars?: number;
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
