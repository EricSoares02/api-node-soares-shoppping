import { z } from "zod";
import { ZodValidationData } from "../../middleware/validationData.Zod";
import { Store } from "../../interfaces/store/store";

const IdSchema = z.string().length(24);
const CnpjSchema = z.string().length(11)


const StoreSchema = z.object({
    name: z.string().min(3),
    photo: z.string().url(),
    cnpj: CnpjSchema,
    desc: z.string().min(3).optional(),
})




class StoreCore {


    async validationId(id: string) {
        return await new ZodValidationData(IdSchema, id).parse();
      }

    async validationData(data: Store) {
        return await new ZodValidationData(StoreSchema, data).parse();
      }

    async validationCnpj(cnpj: string) {
        return await new ZodValidationData(CnpjSchema, cnpj).parse();
      }
      
}

export { StoreCore }