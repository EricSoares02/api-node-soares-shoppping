import { Router } from "express";
import { ProdutoController, UserController } from "../controllers";
import { StoreController } from "../controllers/store";

export const router = Router();

// ROTAS PARA PRODUTO

// rota para pegar produtos por especificos -- rota de search
router.get("/search/value?", ProdutoController.search);
// rota para criar um produto
router.post("/produtos",ProdutoController.createProductValidator,ProdutoController.create);
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
router.post("/user", UserController.create)


// ROTAS PARA STORE
// rota para criar Store
router.post("/user", StoreController.create)