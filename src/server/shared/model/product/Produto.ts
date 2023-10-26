
export interface IProduto{

id: string,
name: string,
url_img: string,
price_in_cent:number,
desc?:string,
category:string

}

export interface IUpdateProdutoProps{
name?: string,
url_img?: string,
price_in_cent?:number,
desc?:string,
category?:string
}