import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getProductsByBooth } from "../controllers/ProductControllers.js";

const router = express.Router();

router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', createProduct);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/booth/:boothId/products', getProductsByBooth);

export default router;