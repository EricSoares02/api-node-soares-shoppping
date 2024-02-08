import { Router } from "express";
// import { StoreController } from "../controller/store/createStore";
// import { ProductController } from "../controller/product/ProductController";
// import { UserController } from "../controller/user/UserController";
// import { CommentController } from "../controller/comment/CommentController";
// import { Authorization } from "../middleware/auth/authorization.express";
// import { SpecialUserController } from "../controller/user/SpecialUserController";
// import { CartController } from "../controller/cart/CartController";
import { CategoryController } from "../controller/category/CategoryController";
import { ElderController } from "../controller/elder/ElderController";
import { UserController } from "../controller/user/UserController";
import { AdminController } from "../controller/admins/AdminController";
import { LoginController } from "../controller/login/loginController";
import { SubCategoryController } from "../controller/subCategory/SubCategoryController";
import { StoreController } from "../controller/store/StoreController";


export const router = Router();


//ROTAS PARA CATEGORIAS
router.post('/category', new CategoryController().create);
router.patch('/category', new CategoryController().update);
router.get('/category/:id', new CategoryController().get);
router.get('/category/name/:name', new CategoryController().getByName);
router.delete('/category', new CategoryController().delete);




//ROTAS PARA SUBCATEGORIAS
router.post('/subcategory', new SubCategoryController().create);
router.patch('/subcategory', new SubCategoryController().update);
router.get('/subcategory/:id', new SubCategoryController().get);
router.delete('/subcategory', new SubCategoryController().delete);




//ROTAS PARA ELDER
router.post('/elder', new ElderController().create);
router.patch('/elder', new ElderController().update);
router.get('/elder/:id', new ElderController().get);
router.get('/elder/email/:email', new ElderController().getByEmail);
router.delete('/elder', new ElderController().delete);




//ROTAS PARA USER
router.post('/user', new UserController().create);
router.patch('/user', new UserController().update);
router.get('/user/:id', new UserController().get);
router.get('/user/email/:email', new UserController().getByEmail);
router.delete('/user', new UserController().delete);




//ROTAS PARA ADMIN
router.post('/admin', new AdminController().create);
router.patch('/admin', new AdminController().update);
router.get('/admin/:id', new AdminController().get);
router.get('/admin/email/:email', new AdminController().getByEmail);
router.delete('/admin', new AdminController().delete);




//ROTA DE LOGIN
router.post('/login', new LoginController().make);





//ROTAS PARA STORE
router.post('/store', new StoreController().create);
router.patch('/store', new StoreController().update);
router.get('/store/:id', new StoreController().get);
router.get('/store/cnpj/:cnpj', new StoreController().getByCnpj);
router.delete('/store', new StoreController().delete);






// ROTAS PARA PRODUTO
// const product = new ProductController();


// // rota para criar um produto
// router.post("/produto", new Authorization().authenticationForAdmin,product.validationProductPost, product.create);
// // rota para criar mais de um produto
// router.post("/");
// // rota para atualizar um produto
// router.patch("/produtos", new Authorization().authenticationForAdmin, product.validationProductPost, product.update);
// // rota para deletar um produto
// router.delete("/");
// // rota para pegar produtos por especificos -- rota de search
// router.get("/produtos/search", product.search);
// // rota para pegar todos os produtos
// router.get("/produtos", product.getAll);
// // rota para pegar produto por id
// router.get("/produto/:id", product.validationProductGet, product.getById);






// // rota para criar usuario
// router.post("/user",user.validationRolePost,user.validationUserPost,user.create);
// // rota para criar usuarios especiais
// router.post("/user/special",specialUser.validationRolePost,specialUser.verifyPostUser, specialUser.create);
// // rota para pegar user por id
// router.get("/user/", user.validationUserGet, user.getById);
// // rota para logar usuario
// router.post("/login", user.validationUserLogin, user.login);



// // ROTAS PARA STORE
// // rota para criar store
// router.post("/store", new Authorization().authenticationForElder, new StoreController().validationStore, new StoreController().create);

// // ROTAS PARA COMMENT
// const comment = new CommentController();
// // rota para criar store
// router.post("/comment", comment.validationCommentPost, comment.create);
// //rota para pegar comments de um product
// router.get(
//   "/comment/produto/:id",
//   comment.validationCommentGet,
//   comment.getByProduct
// );
// //rota para pegar comments de um user
// router.get("/comment/user", comment.validationCommentGetByUser, comment.getByUser);


// // ROTAS PARA CART 
// const cart = new CartController();

// //rota para criar carrinho
// router.post('/cart', cart.validationPostCart, cart.create);
// // rota para inserir e aumentar item no carrinho
// router.post('/cart/insert-product', cart.validationInsertProductCart, cart.insertProductInCart);
// // rota para diminuir item no carrinho
// router.patch('/cart/less-product', cart.validationLessProductCart, cart.lessProductToCart);
// // rota para pegar o carrinho
// router.get('/cart', cart.getCart);
// // rota para remover um item no carrinho
// router.patch('/cart/remove-product', cart.validationRemoveProductCart, cart.removeProductToCart);
