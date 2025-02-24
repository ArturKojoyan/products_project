import express from "express";
import productController from "../controllers/product";
import checkAuth from "../middlewares/checkAuth";
const router = express.Router();

// product routes
router.post("/", checkAuth, productController.createProduct);
router.get("/:productId", productController.getProductById);
router.get("/", productController.getAllProducts);
// router.patch("/:productId/edit", checkAuth, productController.updateProduct);

export default router;
