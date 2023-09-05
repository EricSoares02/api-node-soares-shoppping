import { Request, Response } from "express";
import { IParamsProps } from "../../shared/model/ParamsProduct";
import { getAllProductsService } from "../../shared/services/produtos/getProduct";


export const getAll = async (req: Request<IParamsProps>, res: Response) => {
 
    try {
      const products = await getAllProductsService();
      return res.json({ message: "sucess", products }).status(200);
    } catch (error) {
      res.json({ message: "error", error }).status(500);
    }
  };
  

