import { IProduto } from "./Produto";

export interface IParamsProps {
  id?: string;
}

export interface IQueryProps {
  page?: number;
  limit?: number;
  query?: string;
  filter?: string;
}

export interface IProdutoUpdateProps{
  id: string,
  data: IProduto,
  oldCategory?: string
}

