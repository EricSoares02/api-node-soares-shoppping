import { Product } from "./IProduct";
import { Store } from "./IStore";
import { ILogin, User } from "./IUser";

export interface IDataValidations{

data: Store | User | ILogin | Product | string
}