import * as create from "./Create";
import * as delet  from "./Delete";
import * as getUser from "./GetUser";
import * as update  from "./Update";



export const UserController={

...create,
...getUser,
...delet,
...update
}