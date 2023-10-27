
export interface IProduto{

id: string,
name: string,
url_img: string,
price_in_cent:number,
desc?:string,
category:string

}
// inserir em produto old product, store e options e tranformar url_img em array
export interface IUpdateProdutoProps{
name?: string,
url_img?: string,
price_in_cent?:number,
desc?:string,
category?:string
}