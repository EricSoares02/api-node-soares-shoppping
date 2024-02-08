import { z } from "zod";
import { ZodValidationData } from "../../middleware/validationData.Zod";
import { SubCategory } from "../../interfaces/subcategory/subCategory";



const IdSchema = z.string().length(24);
const NameSchema = z.string().min(3)

const SubCategorySchema = z.object({
    name: NameSchema,
    categoryId: IdSchema
});

class SubCategoryCore {
 
  async validationId(id: string) {
    return await new ZodValidationData(IdSchema, id).parse();
  }


  async validationData(data: SubCategory) {
    return await new ZodValidationData(SubCategorySchema, data).parse();
  }

  async validationName(name: string) {
    return await new ZodValidationData(NameSchema, name).parse();
  }

}


export { SubCategoryCore };
