import { ZodValidationData } from "../../middleware/validationData.Zod";
import { z } from "zod";
import { IProductParamsToCreate, IProductParamsToUpdate, Product } from "../../interfaces/product/product";

const IdSchema = z.string().length(24);
const ParamsSchema = z.string().min(1)
type CategoryTypeToCore = {
    category: string,
    subCategory: string
}



const ProductSchemaToUpdate = z.object({
    id: IdSchema,
    name: z.string().min(3),
    price: z.number().positive(),
    desc: z.string().min(3), 
    photos: z.array(z.string().url()), 
    categoryName: z.string().min(3),
    subCategoryName: z.string().min(3),
    storeId: IdSchema
});




const ProductSchemaToCreate = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    desc: z.string().min(3), 
    photos: z.array(z.string().url()), 
    categoryName: z.string().min(3),
    subCategoryName: z.string().min(3),
    storeId: IdSchema.optional(),
    });




const OptionsSchema = {

    modaSchema: z.object({
        color: z.array(z.string().min(4)).optional(),
        size: z.array(z.string()),
    }),
    

    esporte: [
        {
            subcategoryName: 'bike',
            schema: z.object({
                color: z.array(z.string().min(4)),
                sizeFrame: z.array(z.string()).optional(),
                rim: z.array(z.string()).optional(),
            })},

        {
            subcategoryName: 'ball',
            schema: z.object({
                color: z.array(z.string().min(4)).optional(),
            })},
        
    ],


    defaultSchema: z.object({
        color: z.array(z.string().min(4)).optional(),
        size: z.array(z.string()),
    })

}



class ProductCore {

    async validationId(id: string){
        return await new ZodValidationData(IdSchema, id).parse();
    }


    async validationDataToCreate(data: IProductParamsToCreate){
        return await new ZodValidationData(ProductSchemaToCreate, data).parse();
    }
    
    async validationDataToUpdate(data: IProductParamsToUpdate){
        return await new ZodValidationData(ProductSchemaToUpdate, data).parse();
    }


    async verifyOptions(options: any, category: CategoryTypeToCore){
    


       switch (category.category) {
        case 'moda':
        return await new ZodValidationData(OptionsSchema.modaSchema, options).parse();
            
       case 'esporte':

        for (let index = 0; index < OptionsSchema.esporte.length; index++) {
            
            if (category.subCategory === OptionsSchema.esporte[index].subcategoryName) {
                return await new ZodValidationData(OptionsSchema.esporte[index].schema, options).parse();
            }
            
        }
       break;

        default:
            return await new ZodValidationData(OptionsSchema.defaultSchema, options).parse();
       }



    }

    async validationParams(data: string){
        return await new ZodValidationData(ParamsSchema, data).parse();
    }

  
}

export { ProductCore };
