import { z } from "zod";
import { Response } from "express";
import { CreateProductType } from "../../interfaces/IProduct";
import { IDataValidations } from "../../interfaces/IDataValidations";
import { BadRequest } from "../../middleware/errors.express";

enum ECategoryModaType {
    infantil = "infantil",
    feminina = "feminina",
    masculina = "masculina",
    moletom = "moletom",
    vestido = "vestido",
    camisa = "camisa",
  }
   
  enum ECategoryEsporteType {
    camisa = "camisa",
    tenis = "tenis",
    bola = "bola",
    esporte_quadra = "esporte de quadra",
    luta = "luta",
    esporte_aquatico = "esporte aquatico",
    esporte_praia = "esporte de praia",
  }
  enum ECategoryInformaticaType {
    notebook = "notebook",
    processador = "processador",
    ram = "ram",
    placa_mae = "placa mae",
    monitor = "monitor",
    placa_Dvideo = "placa de video",
    mouse_teclado = "mouse teclado",
    tablet = "tablet",
    kit_hardware = "kit hardware",
  }
  
  enum ECategoryBebidaType {
    suco = "suco",
    refrigerante = "refrigerante",
    leite = "leite",
    energetico = "energetico",
    tonico = "tonico",
    cerveja = "cerveja",
    vinho_Eespumante = "vinho e espumante",
    licor_Ewhisky = "licor e whisky",
  }
  enum ECategoryFerramentaType {
    ferramenta_eletrica = "ferramenta eletrica",
    ferramenta_manual = "ferramenta manual",
    ferramenta_industrial = "ferramenta industrial",
    ferramenta_medicao_instrumentacao = "ferramenta medicao instrumentacao",
    ferramenta_pneumaticas = "ferramenta pneumaticas",
  }
  enum ECategoryBrinquedoType {
    boneca = "boneca",
    boneco = "boneco",
    mini_veiculo = "mini veiculo",
    carrinho = "carrinho",
    pelucia = "pelucia",
    jogos = "jogos",
    bicicleta = "bicicleta",
  }

  
    function Validation(enumType: any, category: string, res: Response) {
      
      const SubCategorySchema = z.object({
        subCategory: z.nativeEnum(enumType)
      })

      try {
        SubCategorySchema.parse(category)
      } catch (error) {
        if (error instanceof z.ZodError) {

        return new BadRequest("Some property is wrong or missing", res).returnError()
        }
      }
    }
 

 class VerifyCategory {
   

    constructor(private Product: CreateProductType) {
      this.Product
    }

    public validationCategoryAndSubCategory(res:Response) {
      const data = this.Product.subCategory;
      switch (this.Product.category) {
        case "moda":
          // validando a sub categoria do produto
          Validation(ECategoryModaType, data, res);
          

          break;
        case "esporte":
          // validando a sub categoria do produto
          Validation(ECategoryEsporteType, data, res);
          
          break;
        case "informatica":
          // validando a sub categoria do produto
          Validation(ECategoryInformaticaType, data, res);
          
          break;
        case "celular":
          break;
        case "bebida":
          // validando a sub categoria do produto
          Validation(ECategoryBebidaType, data, res);
       
          break;
        case "eletrodomestico":
          break;
        case "ferramenta":
          // validando a sub categoria do produto
          Validation(ECategoryFerramentaType, data, res);
          
          break;
        case "brinquedo":
          // validando a sub categoria do produto
          Validation(ECategoryBrinquedoType, data, res);
         
          break;
        case "automovel":
          break;
        default:
         res.json({message:"this category cannot exist"})
          break;
      }
      
    }
  }


  export {VerifyCategory}