import express from "express";
import multer from "multer";
import upload from '../middleware/uploadConfig.js'; 

import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, getProductsByBooth } from "../controllers/ProductControllers.js";

const router = express.Router();

router.get('/product', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', upload.single('image'), createProduct);
router.patch('/product/:id',upload.single('image'), updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/booth/:boothId/products', getProductsByBooth);


export default router;