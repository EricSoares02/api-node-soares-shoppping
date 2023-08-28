import { Router } from "express";
import { ProdutoController } from "../controllers";

export const router = Router();

router.get("/", (req, res) => {
  res.send("tá indo");
});

router.post("/produtos", ProdutoController.createBodyValidator,ProdutoController.create);
router.get("/produtos",ProdutoController.getAll);
router.put("/produtos/:id",ProdutoController.update);
router.delete("/produtos/:id",ProdutoController.delet);
router.get("/produtos/:id",ProdutoController.getById);
