import { Router } from "express";

import { CategoryController } from "../controller/category/CategoryController";
import { ElderController } from "../controller/elder/ElderController";
import { UserController } from "../controller/user/UserController";
import { AdminController } from "../controller/admins/AdminController";
import { LoginController } from "../controller/login/loginController";
import { SubCategoryController } from "../controller/subCategory/SubCategoryController";
import { StoreController } from "../controller/store/StoreController";
import { ProductController } from "../controller/product/ProductController";
import { CartController } from "../controller/cart/CartController";
import { CommentController } from "../controller/comment/CommentController";
import { LikeController } from "../controller/like/LikeController";


export const router = Router();


//ROTAS PARA CATEGORIAS
router.post('/category', new CategoryController().create);
router.patch('/category', new CategoryController().update);
router.get('/category/:id', new CategoryController().get);
router.get('/category/name/:name', new CategoryController().getByName);
router.delete('/category/:id', new CategoryController().delete);




//ROTAS PARA SUBCATEGORIAS
router.post('/subcategory', new SubCategoryController().create);
router.patch('/subcategory', new SubCategoryController().update);
router.get('/subcategory/:id', new SubCategoryController().get);
router.get('/subcategory/get/getbyname', new SubCategoryController().checkByCategory);
router.delete('/subcategory/:id', new SubCategoryController().delete);




//ROTAS PARA ELDER
router.post('/elder', new ElderController().create);
router.patch('/elder', new ElderController().update);
router.get('/elder/:id', new ElderController().get);
router.get('/elder/email/:email', new ElderController().getByEmail);
router.delete('/elder', new ElderController().delete);




//ROTAS PARA USER
router.post('/user', new UserController().create);
router.patch('/user', new UserController().update);
router.get('/user', new UserController().get);
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
router.delete('/store/:id', new StoreController().delete);






//ROTAS PARA PRODUCTS
router.post('/product', new ProductController().create);
router.patch('/product', new ProductController().update);
router.get('/product/:id', new ProductController().get);
router.get('/product/category/:category', new ProductController().getByCategory);
router.get('/product/params/:props', new ProductController().getByParams);
router.delete('/product', new ProductController().delete);







//ROTAS PARA CART
router.post('/cart', new CartController().create);
router.patch('/cart', new CartController().update);
router.get('/cart', new CartController().get);
router.delete('/cart', new CartController().delete);







//ROTAS PARA COMMENTS
router.post('/comments', new CommentController().create);
router.patch('/comments', new CommentController().update);
router.get('/comments/:id', new CommentController().get);
router.get('/comments/product/:id', new CommentController().getByProduct);
router.get('/comments', new CommentController().getByUser);
router.delete('/comments/:id', new CommentController().delete);







//ROTAS PARA LIKE
router.post('/like', new LikeController().like);
router.get('/like/:id', new LikeController().get);
router.get('/like', new LikeController().getByUser);
router.delete('/like/:id', new LikeController().dislike);