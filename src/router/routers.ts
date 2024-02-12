import { Router } from "express";

import { CategoryController } from "../controller/category/CategoryController";
import { ElderController } from "../controller/elder/ElderController";
import { UserController } from "../controller/user/UserController";
import { AdminController } from "../controller/admins/AdminController";
import { LoginController } from "../controller/login/loginController";
import { SubCategoryController } from "../controller/subCategory/SubCategoryController";
import { StoreController } from "../controller/store/StoreController";
import { ProductController } from "../controller/product/ProductController";


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
router.get('/subcategory/name/:name', new SubCategoryController().checkByCategory);
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






//ROTAS PARA PRODUCTS
router.post('/product', new ProductController().create);
router.patch('/product', new ProductController().update);
router.get('/product/:id', new ProductController().get);
router.get('/product/category/:category', new ProductController().getByCategory);
router.get('/product/params/:props', new ProductController().getByParams);
router.delete('/product', new ProductController().delete);
