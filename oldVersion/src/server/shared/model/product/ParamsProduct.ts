import { IUpdateProdutoProps } from "./Produto";

export interface IParamsProps {
  id?: string;
}

export interface IQueryProps {
  page?: number;
  limit?: number;
  query?: string;
  filter?: string;
}

export interface IUpdateProps {
  updateType: string;
  id: string;
  data: IUpdateProdutoProps;
}
