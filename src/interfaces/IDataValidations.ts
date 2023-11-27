import { Product } from "./IProduct";
import { Store } from "./IStore";
import { User } from "./IUser";

export interface IDataValidations{

data: Store | User | Product | string
}