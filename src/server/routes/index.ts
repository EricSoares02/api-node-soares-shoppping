import { Router } from "express";
import { ProdutoController } from "../controllers";

export const router = Router();

router.get("/", (req, res) => {
  res.send("tá indo");
});

router.post("/produtos", ProdutoController.create);
