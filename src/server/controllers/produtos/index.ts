import * as create from "./Create";
import * as delet  from "./Delete";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as update  from "./Update";



export const ProdutoController={

...create,
...getAll,
...getById,
...delet,
...update

}