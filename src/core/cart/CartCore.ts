import { z } from "zod";
import { ZodValidationData } from "../../middleware/validationData.Zod";
import { Cart, CartTypeToCreate } from "../../interfaces/cart/cart";

const IdSchema = z.string().length(24);

const ProductInCartSchema = z.object({
    id: IdSchema,
    name: z.string().min(3),
    options: z.string().min(3),
    quantity: z.number().int().positive(),
    price: z.number().int().positive(),
    photos: z.string().url(),
})


const CartSchemaToCreate = z.object({
    ownerId: IdSchema,
    products: z.array(ProductInCartSchema).optional()
})


const CartSchemaToUpdate = z.object({
    id: IdSchema,
    ownerId: IdSchema,
    products: z.array(ProductInCartSchema)
})




class CartCore {


    async validationId(id: string){
        return await new ZodValidationData(IdSchema, id).parse();
    }


    async validationDataToCreate(data: CartTypeToCreate){
        return await new ZodValidationData(CartSchemaToCreate, data).parse();
    }


    async validationDataToUpdate(data: Cart){
        return await new ZodValidationData(CartSchemaToUpdate, data).parse();
    }
    
}

export { CartCore }