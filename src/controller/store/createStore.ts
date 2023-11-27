import { NextFunction, Request, Response } from "express";
import { Store } from "../../interfaces/IStore";
import { StoreCore } from "../../core/store/VerifyStore";
import { StoreService } from "../../services/store/createStoreService";
import { StoreRepository } from "../../repositories/store/CreateStoreRepository";
import { BadRequest, InternalError } from "../../middleware/errors.express";
import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { ResponseToCreated } from "../../middleware/Response.express";

// schema de validação de Store
const StoreSchema = z.object({
  name: z.string().min(3),
  email: z.string().email("email format is required"),
  password: z.string(),
  url_img: z.string().url(),
  cnpj: z.number(),
  desc: z.string().optional(),
});

class StoreController {
  public validationStore(
    req: Request<"", "", Store>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.body };
    ValidationData(StoreSchema, data, next);
  }

  public async create(req: Request<"", "", Store>, res: Response) {
    const core = new StoreCore();
    const verify = await core.existStoreVerify(req.body).catch(() => {
      throw new InternalError("Internal Server Error", res);
    });
    console.log(`verify: ${verify}`);
    console.log("chegou em create");

    if (!verify) {
      console.log("criando");
      const service = new StoreService(new StoreRepository());
      const { cnpj, desc, email, name, password, url_img } = req.body;
      const created = await service.executeCreateStoreRepository(
        "",
        name,
        email,
        password,
        url_img,
        cnpj,
        desc
      );

      //se o id for diferente de vazio, significa que product foi criado e retornamos a resposta da requizição
      if (created.id !=="") {
        const response = new ResponseToCreated(created) 
        response.res(res)
      }
    } else {
      return new BadRequest("This Store exist", res).returnError();
    }
  }
}

export { StoreController };
