import { RequestHandler } from "express"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TValidation=(field: 'headers' | 'body' | 'query' | 'params', schema: any)=> RequestHandler;

export const validation:TValidation = (field, schema) => async (req, res, next)=>{

    try {
        await schema.parse(req[field]);
        res.send(`valitadion sucesss`);
        return next();
      } catch (error) {
        res.status(400).send(`deu merda ioda${error}`);
      }

}

