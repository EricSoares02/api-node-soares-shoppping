import { Router } from "express";
import { CommentController, ProdutoController, StoreController, UserController } from "../controllers";
import { UserLoginController } from "../controllers/users/login";

export const router = Router();

// ROTAS PARA PRODUTO

// rota para pegar produtos por especificos -- rota de search
router.get("/search/value?", ProdutoController.search);
// rota para criar um produto
router.post("/produtos/:storeId",ProdutoController.create);
// rota para criar mais de um produto
router.post("/produtos/createmany/:storeId", ProdutoController.createMany)
// rota para atualizar um produto
router.patch("/produtosup/:id", ProdutoController.update);
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
router.post("/user", UserController.create);
router.post("/getuser", UserController.getUser);
// rote para logar usuario
router.post("/login", UserLoginController.login)



// ROTAS PARA STORE
// rota para criar store
router.post("/store", StoreController.create)


// ROTAS PARA COMMENT
// rota para criar store
router.post("/comment", CommentController.create)