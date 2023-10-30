import { Router } from "express";
import { ProdutoController, StoreController } from "../controllers";

export const router = Router();

// ROTAS PARA PRODUTO

// rota para pegar produtos por especificos -- rota de search
router.get("/search/value?", ProdutoController.search);
// rota para criar um produto
router.post("/produtos",ProdutoController.create);
// rota para criar mais de um produto
router.post("/produtos/createmany", ProdutoController.createMany)
// rota para atualizar um produto
router.patch("/produtos/:id", ProdutoController.update);
// rota para deletar um produto
router.delete("/produtos/:id", ProdutoController.delet);
// rota para pegar todos os produtos 
router.get("/produtos", ProdutoController.getAll);
// rota para pegar produto por id 
router.get("/produtos/:id",ProdutoController.getIdProductValidator,ProdutoController.getById);


// ROTAS PARA TESTE
router.get("/teste");


// ROTAS PARA USER
// rota para criar usuario
router.post("/user");



// ROTAS PARA USER
// rota para criar store
router.post("/store", StoreController.create)