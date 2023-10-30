import { z } from "zod";
import { Response } from "express";

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

  function subCategoryValidation(value: any, data: string) {
    const SubCategorySchema = z.nativeEnum(value);
    SubCategorySchema.parse(data);
  }

export class CategoryMidlleware {
   
 

    constructor(private category: string, private subCategory: string, private res: Response ) {
      this.category;
      this.subCategory;
    }

    public validationCategoryAndSubCategory() {
      switch (this.category) {
        case "moda":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryModaType, this.subCategory);
          

          break;
        case "esporte":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryEsporteType, this.subCategory);
          
          break;
        case "informatica":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryInformaticaType, this.subCategory);
          
          break;
        case "celular":
          break;
        case "bebida":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryBebidaType, this.subCategory);
       
          break;
        case "eletrodomestico":
          break;
        case "ferramenta":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryFerramentaType, this.subCategory);
          
          break;
        case "brinquedo":
          // validando a sub categoria do produto
          subCategoryValidation(ECategoryBrinquedoType, this.subCategory);
         
          break;
        case "automovel":
          break;
        default:
         this.res.json({message:"this category cannot exist"})
          break;
      }
    }
  }