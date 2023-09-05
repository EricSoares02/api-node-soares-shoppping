import { RequestHandler } from "express"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TValidation=(field: 'headers' | 'body' | 'query' | 'params', schema: any)=> RequestHandler;

export const validation:TValidation = (field, schema) => async (req, res, next)=>{

    try {
        await schema.parse(req[field]);
        console.log(`valitadion sucesss`);
       next()
      } catch (error) {
        res.status(400).send(`a paramater is required:${error}`);
      }

}

