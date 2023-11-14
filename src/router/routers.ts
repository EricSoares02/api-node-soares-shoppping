import { Router } from "express";


export const router = Router();

// ROTAS PARA PRODUTO

// rota para pegar produtos por especificos -- rota de search
router.get("/search/value?");
// rota para criar um produto
router.post("/produtos/:storeId");
// rota para criar mais de um produto
router.post("/produtos/createmany/:storeId")
// rota para atualizar um produto
router.patch("/produtosup/:id");
// rota para deletar um produto
router.delete("/produtos/:id");
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
router.post("/store")


// ROTAS PARA COMMENT
// rota para criar store
router.post("/comment")