import { Router } from "express";
import { ProdutoController } from "../controllers";
import { prisma } from "../shared/services/prisma/prisma";

export default async function connect() {
  try {
    await prisma.$connect();
    console.log('Database connected sucess')
  } catch (error) {
    console.log("Database connected unsucessull");
  }
}

export const router = Router();

router.get("/", (req, res) => {
  res.send("tá indo");
});

router.post(
  "/produtos",
  ProdutoController.createBodyValidator,
  ProdutoController.create
);
router.get("/produtos", ProdutoController.getAll);
router.put("/produtos/:id", ProdutoController.update);
router.delete("/produtos/:id", ProdutoController.delet);
router.get("/produtos/:id", ProdutoController.getById);
router.get("/teste", async (req, res) => {
  try {
    connect();
    const posts = await prisma.post.findMany();
    return res.json({message:'sucess', posts}).status(200)
  } catch (error) {
    res.json({ message: "error", error }).status(500);
  } finally {
    await prisma.$disconnect();
  }
});
