import { Router } from "express";
import { ProdutoController } from "../controllers";

export const router = Router();

router.get("/search/value?", ProdutoController.search);
router.post(
  "/produtos",
  ProdutoController.createProductValidator,
  ProdutoController.create
);
router.put("/produtos/:id", ProdutoController.update);
router.delete("/produtos/:id", ProdutoController.delet);
router.get("/produtos", ProdutoController.getAll);
router.get(
  "/produtos/:id",
  ProdutoController.getIdProductValidator,
  ProdutoController.getById
);
router.get("/search?value=", ProdutoController.search);
router.get("/teste");
