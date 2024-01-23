import { Router } from "express";
import { StoreController } from "../controller/store/createStore";
import { ProductController } from "../controller/product/ProductController";
import { UserController } from "../controller/user/UserController";
import { CommentController } from "../controller/comment/CommentController";
import { Authorization } from "../middleware/auth/authorization.express";
import { SpecialUserController } from "../controller/user/SpecialUserController";
import { CartController } from "../controller/cart/CartController";


export const router = Router();

// ROTAS PARA PRODUTO
const product = new ProductController();
// rota para criar um produto
router.post("/produto", new Authorization().authenticationForAdmin,product.validationProductPost, product.create);
// rota para criar mais de um produto
router.post("/");
// rota para atualizar um produto
router.patch("/produtos", new Authorization().authenticationForAdmin, product.validationProductPost, product.update);
// rota para deletar um produto
router.delete("/");
// rota para pegar produtos por especificos -- rota de search
router.get("/produtos/search", product.search);
// rota para pegar todos os produtos
router.get("/produtos", product.getAll);
// rota para pegar produto por id
router.get("/produto/:id", product.validationProductGet, product.getById);

// ROTAS PARA USER
const user = new UserController();
const specialUser = new SpecialUserController()
// rota para criar usuario
router.post("/user",user.validationRolePost,user.validationUserPost,user.create);
// rota para criar usuarios especiais
router.post("/user/special",specialUser.validationRolePost,specialUser.verifyPostUser, specialUser.create);
// rota para pegar user por id
router.get("/user/", user.validationUserGet, user.getById);
// rota para logar usuario
router.post("/login", user.validationUserLogin, user.login);

// ROTAS PARA STORE

// rota para criar store
router.post("/store", new Authorization().authenticationForElder, new StoreController().validationStore, new StoreController().create);

// ROTAS PARA COMMENT
const comment = new CommentController();
// rota para criar store
router.post("/comment", comment.validationCommentPost, comment.create);
//rota para pegar comments de um product
router.get(
  "/comment/produto/:id",
  comment.validationCommentGet,
  comment.getByProduct
);
//rota para pegar comments de um user
router.get("/comment/user", comment.validationCommentGetByUser, comment.getByUser);


// ROTAS PARA CART 

const cart = new CartController();

router.post('/cart', cart.validationPostCart, cart.create);
router.post('/cart/insertProduct/:id', cart.validationInsertProductCart, cart.insertProductInCart);
// router.patch('/cart', cart.validationRemoveProductCart, cart.removeProductToCart);
// router.get('/cart/product', cart.getProductsByCart)
