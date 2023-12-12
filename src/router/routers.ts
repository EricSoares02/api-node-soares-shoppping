import { Router } from "express";
import { StoreController } from "../controller/store/createStore";
import { ProductController } from "../controller/product/ProductController";
import { UserController } from "../controller/user/UserController";
import { CommentController } from "../controller/comment/CommentController";


export const router = Router();

// ROTAS PARA PRODUTO
const product = new ProductController()
// rota para criar um produto
router.post("/produtos", product.validationProductPost, product.create);
// rota para criar mais de um produto
router.post("/")
// rota para atualizar um produto
router.patch("/produtos", product.validationProductPost, product.update);
// rota para deletar um produto
router.delete("/");
// rota para pegar produtos por especificos -- rota de search
router.get("/produtos/search", product.search);
// rota para pegar todos os produtos 
router.get("/produtos", product.getAll);
// rota para pegar produto por id 
router.get("/produto/:id", product.validationProductGet, product.getById);


// ROTAS PARA USER
const user = new UserController()
// rota para criar usuario
router.post("/user", user.validationRolePost, user.validationUserPost, user.create);
// rota para pegar user por id
router.get("/user/:id", user.validationUserGet, user.getById);
// rota para logar usuario
router.post("/login", user.validationUserLogin, user.login)


// ROTAS PARA STORE
const store = new StoreController();
// rota para criar store
router.post("/store", store.validationStore, store.create)


// ROTAS PARA COMMENT
const comment = new CommentController();
// rota para criar store
router.post("/comment", comment.validationCommentPost, comment.create);
//rota para pegar comments de um product
router.get("/comment/produto/:id", comment.validationCommentGet, comment.getByProduct);
//rota para pegar comments de um user
router.get("/comment/user/:id", comment.validationCommentGet, comment.getByUser);