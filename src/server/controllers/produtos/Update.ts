import { Request } from "express";
import { IParamsProps, IUpdateProps } from "../../shared/model/ParamsProduct";
import { UpdateMiddleWare } from "../../shared/middleware/products/udpate/UpdateProdutcs";

export const update = async (req: Request<IParamsProps, "", IUpdateProps>) => {
  const id = req.params.id || "";
  const updateType = req.body.updateType;
  const data = {
    id: id,
    name: req.body.data.name || '',
    url_img: req.body.data.url_img || '',
    price_in_cent: req.body.data.price_in_cent || 1,
    category: req.body.data.category || '',
    desc: req.body.data.desc || '',
  };

  const dataUpdate = { id, data, updateType };

  UpdateMiddleWare(dataUpdate);
};
