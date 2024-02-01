import { z } from "zod";
import { NextFunction, Response } from "express";
import { ProductOptions } from "../../interfaces/IProduct";
import { BadRequest } from "../../middleware/errors.express";


const ModaOptionSchema = z.object({
    sizes: z.array(z.string()).max(7, "7 é o número máximo de opções"),
    colors: z.array(z.string().min(4)).max(7, "7 é o número máximo de opções").optional()
  });


const BallOptionSchema = z.object({
    colors: z.array(z.string().min(4)).max(7, "7 é o número máximo de opções")
})

const DrinkOptionSchema = z.object({
    volume: z.array(z.string()).max(7, "7 é o número máximo de opções"),
})


  enum ECategoryEsporteType {
    esporte_quadra = "esporte de quadra",
    luta = "luta",
    esporte_aquatico = "esporte aquatico",
    esporte_praia = "esporte de praia",
  }



  function OptionsValidation(Schema: any, options: ProductOptions, res: Response) {
    
    try {
      Schema.parse(options)
    } catch (error) {
      if (error instanceof z.ZodError) {

      return new BadRequest("Some property is wrong or missing: ", res).returnError()
      }
    }
  }

 class verifyOptions {
   

    constructor(private options: ProductOptions, private prop: {category: string, subCategory: string}) {
      this.options,
      this.prop
    }

    public validationOptions(res:Response) {
      switch (this.prop.category) {
        case "moda":
          // validando a sub categoria do produto
          OptionsValidation(ModaOptionSchema, this.options, res);
          break;
        case "esporte":
          
        
            switch (this.prop.subCategory) {
                case 'camisa':
                    OptionsValidation(ModaOptionSchema, this.options, res);
                break;
                case 'tenis':
                    OptionsValidation(ModaOptionSchema, this.options, res);
                break;
                case 'bola':
                    OptionsValidation(BallOptionSchema, this.options, res);
                break;
        
                default:
                    res.json({message:"this options cannot exist"})
                break;
                }

          OptionsValidation(ECategoryEsporteType, this.options, res);
          
          break;
        case "informatica":
          // validando a sub categoria do produto
          
          
          break;
        case "celular":

          break;
        case "bebida":
          // validando a sub categoria do produto
          OptionsValidation(DrinkOptionSchema, this.options, res);
       
          break;
        case "eletrodomestico":
          break;
        case "ferramenta":
          // validando a sub categoria do produto
         
          
          break;
        case "brinquedo":
          // validando a sub categoria do produto
          
         
          break;
        case "automovel":
          break;
        default:
         res.json({message:"this options cannot exist"})
          break;
      }
      
    }
  }


  export {verifyOptions}