import { Request, Response } from "express";
import { IProduto } from "../../shared/model/Produto";


// eslint-disable-next-line @typescript-eslint/ban-types
export const getById = async (req: Request<{}, {}, IProduto>, res: Response) => {
  console.log(req.params);

  res.send("nada maninho");
};