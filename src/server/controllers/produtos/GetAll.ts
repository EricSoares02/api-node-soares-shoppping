import { Request, Response } from "express";
import { IParamsProps } from "../../shared/model/ParamsProduct";


// eslint-disable-next-line @typescript-eslint/ban-types
export const getAll = async (req: Request<IParamsProps>, res: Response) => {
  console.log(req.params);

  res.send("nada maninho");
};
