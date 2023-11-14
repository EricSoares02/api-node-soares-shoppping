import { Response } from "express";

export const voidGetCheck = (value:any, res:Response)=>{
    if (!value) {
        return res.json({ message: "not found"}).status(401);
      } else {
          return res.json({ message: "sucess", data: value }).status(200);
      }

}