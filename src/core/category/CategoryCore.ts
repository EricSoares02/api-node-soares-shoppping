import { z } from "zod";

import { Category } from "../../interfaces/category/category";
import { ZodValidationData } from "../../middleware/validationData.Zod";

const IdSchema = z.string().length(24);
const NameSchema = z.string().min(3);

const DataSchema = z.object({
  name: NameSchema,
});

class CategoryCore {
  async validationId(id: string) {
    return await new ZodValidationData(IdSchema, id).parse();
  }

  async validationName(name: string) {
    return await new ZodValidationData(NameSchema, name).parse();
  }

  async validationData(data: Category) {
    return await new ZodValidationData(DataSchema, data).parse();
  }
}

export { CategoryCore };
