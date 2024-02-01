import { z } from "zod";
import { ValidationData } from "../../middleware/validationData.Zod";
import { CategoryType } from "../../interfaces/category/category";

const IdSchema = z.string().length(24);
const NameSchema = z.string().min(3);

const DataSchema = z.object({
  name: NameSchema,
});

class CategoryCore {
  async validationId(id: string) {
    return await ValidationData(IdSchema, id);
  }

  async validationName(name: string) {
    return await ValidationData(NameSchema, name);
  }

  async validationData(data: CategoryType) {
    return await ValidationData(DataSchema, data);
  }
}

export { CategoryCore };
