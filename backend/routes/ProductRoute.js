import express from "express";
import {getProducts, getProductById, createProducts, updateProduct, deleteProduct} from "../controllers/ProductControllers.js"

const router = express.Router();

router.get('/product', getProducts);
router.get('/product/: id', getProductById);
router.post('/product', createProducts);
router.patch('/product/: id', updateProduct);
router.delete('/product: id', deleteProduct);

export default router;