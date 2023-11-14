import { Request, Response } from "express";
import {
  IParamsProps,
  IUpdateProps,
} from "../../shared/model/product/ParamsProduct";
import { UpdateMiddleWare } from "../../shared/middleware/products/udpate/UpdateProdutcs";

export const update = async (
  req: Request<IParamsProps, "", IUpdateProps>,
  res: Response
) => {
  const id = req.params.id || "";
  const updateType = req.body.updateType;
  const data = {
    id: id,
    name: req.body.data.name || "",
    url_img: req.body.data.url_img || [],
    price_in_cent: req.body.data.price_in_cent || 1,
    category: req.body.data.category || "",
    desc: req.body.data.desc || "",
    subCategory: req.body.data.subCategory || "",
    options: req.body.data.options || [],
  };

  const dataUpdate = { id, data, updateType };

  console.log('tem que mudar as rotas de update', dataUpdate, res )
  UpdateMiddleWare(dataUpdate, res);
};
