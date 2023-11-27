import { NextFunction, Request, Response } from "express";
import { BadRequest, InternalError } from "../../middleware/errors.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { Product } from "../../interfaces/IProduct";

// schema de validação de Product
const ProductSchema = z.object({
  name: z.string().min(3),
  email: z.string().email("email format is required"),
  password: z.string(),
  url_img: z.string().url(),
  cnpj: z.number(),
  desc: z.string().optional(),
});

class ProductController {

  public validationProduct(
    req: Request<"", "", Product>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(ProductSchema, data, next);
  }

  public async create(req: Request<"", "", Product>, res: Response) {
   
   
   
   
//     const core = new StoreCore();
//     const verify = await core.existStoreVerify(req.body).catch(() => {
//       throw new InternalError("Internal Server Error", res);
//     });
//     console.log(`verify: ${verify}`);
//     console.log("chegou em create");

//     if (!verify) {
//       console.log("criando");
//       const service = new StoreService(new StoreRepository());
//       const { cnpj, desc, email, name, password, url_img } = req.body;
//       await service.executeCreateStoreRepository(
//         "",
//         name,
//         email,
//         password,
//         url_img,
//         cnpj,
//         desc
//       );
//     } else {
//       return new BadRequest("This Store exist", res).returnError();
//     }
   }
}

export { ProductController };
