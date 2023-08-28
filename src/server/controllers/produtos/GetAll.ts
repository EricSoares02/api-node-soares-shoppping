import { Request, Response } from "express";
import { IProduto } from "../../shared/model/Produto";



// interface IQuery{

// page?:number,
// limit?: number,
// filter?: string

// }


// eslint-disable-next-line @typescript-eslint/ban-types
export const getAll = async (req: Request<{}, {}, IProduto>, res: Response) => {
  console.log(req.query);

  res.send("nada maninho");
};

