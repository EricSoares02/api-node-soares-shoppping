import { Router } from "express";
import { StoreController } from "../controller/store/createStore";
import { ProductController } from "../controller/product/ProductController";


export const router = Router();

// ROTAS PARA PRODUTO
const product = new ProductController()
// rota para criar um produto
router.post("/produtos", product.validationProduct, product.create);
// rota para criar mais de um produto
router.post("/produtos/createmany/:storeId")
// rota para atualizar um produto
router.patch("/produtosup/:id");
// rota para deletar um produto
router.delete("/produtos/:id");
// rota para pegar produtos por especificos -- rota de search
router.get("/search/value?");
// rota para pegar todos os produtos 
router.get("/produtos");
// rota para pegar produto por id 
router.get("/produtos/:id");


// ROTAS PARA USER
// rota para criar usuario
router.post("/user");
router.post("/getuser");
// rote para logar usuario
router.post("/login")


// ROTAS PARA STORE


// rota para criar store
const store = new StoreController();
router.post("/store", store.validationStore, store.create)


// ROTAS PARA COMMENT
// rota para criar store
router.post("/comment")