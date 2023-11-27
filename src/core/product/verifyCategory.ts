import { z } from "zod";
import { NextFunction, Response } from "express";
import { ValidationData } from "../../middleware/validationData.Zod";
import { Product } from "../../interfaces/IProduct";

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


  function subCategoryValidation(enumValue: any, Product: Product, next:NextFunction) {
    const SubCategorySchema = z.object({
      subCategory: z.nativeEnum(enumValue)
    })
    const data = {data:Product}
    ValidationData(SubCategorySchema, data, next);
  }

 class VerifyCategory {
   

    constructor(private Product: Product) {
      this.Product
    }

    public validationCategoryAndSubCategory(next:NextFunction, res:Response) {
      switch (this.Product.category) {
        case "moda":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryModaType, this.Product, next);
          

          break;
        case "esporte":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryEsporteType, this.Product, next);
          
          break;
        case "informatica":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryInformaticaType, this.Product, next);
          
          break;
        case "celular":
          break;
        case "bebida":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryBebidaType, this.Product, next);
       
          break;
        case "eletrodomestico":
          break;
        case "ferramenta":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryFerramentaType, this.Product, next);
          
          break;
        case "brinquedo":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryBrinquedoType, this.Product, next);
         
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