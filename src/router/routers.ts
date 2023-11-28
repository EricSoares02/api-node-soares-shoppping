import { Router } from "express";
import { StoreController } from "../controller/store/createStore";
import { ProductController } from "../controller/product/ProductController";


export const router = Router();

// ROTAS PARA PRODUTO
const product = new ProductController()
// rota para criar um produto
router.post("/produtos", product.validationProductPost, product.create);
// rota para criar mais de um produto
router.post("/produtos/createmany/:storeId")
// rota para atualizar um produto
router.patch("/produtos", product.validationProductPost, product.update);
// rota para deletar um produto
router.delete("/produtos/:id");
// rota para pegar produtos por especificos -- rota de search
router.get("/produtos/search", product.search);
// rota para pegar todos os produtos 
router.get("/produtos", product.getAll);
// rota para pegar produto por id 
router.get("/produto/:id", product.validationProductGet, product.getById);


// ROTAS PARA USER
// rota para criar usuario
router.post("/user");
router.post("/getuser");
// rote para logar usuario
router.post("/login")


// ROTAS PARA STORE
const store = new StoreController();
// rota para criar store
router.post("/store", store.validationStore, store.create)


// ROTAS PARA COMMENT
// rota para criar store
router.post("/comment")