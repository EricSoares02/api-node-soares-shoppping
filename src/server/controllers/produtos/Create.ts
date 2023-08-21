import { Request, Response } from "express";
import { IProduto } from "../../shared/model/Produto";



// eslint-disable-next-line @typescript-eslint/ban-types
export const create = (req:Request<{},{},IProduto>, res:Response)=>{


res.send('hello guys')

}