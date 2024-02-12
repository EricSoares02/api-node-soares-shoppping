import { ZodValidationData } from "../../middleware/validationData.Zod";
import { z } from "zod";
import { Product, ProductCategoryType } from "../../interfaces/product/product";

const IdSchema = z.string().length(24);


const ProductSchema = z.object({

name: z.string().min(3),
price: z.number().positive(),
desc: z.string().min(3), 
photos: z.array(z.string().url()), 
category: z.object({
    name: z.string().min(3),
    subCategory: z.string().min(3)
})
});


const ParamsSchema = z.string().min(2)


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


    async validationData(data: Product){
        return await new ZodValidationData(ProductSchema, data).parse();
    }
    

    async verifyOptions(options: any, category: ProductCategoryType){
    


       switch (category.subCategory) {
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
