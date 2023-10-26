import { z } from "zod";
import { IStore } from "../../model/store/Store";
import { createStoreService } from "../../services/store/createStore";

// schema de validaçao do store
const StoreSchema = z.object({
    firstName: z.string().min(3),
    email: z.string().email(),
    password: z.string(),
    photo: z.string().url(),
  });



export function CreateStoreMiddleware(user:IStore, res: Response){
    //validando store recebido por props
    StoreSchema.parse(user); 
    createStoreService(res,user)  

}