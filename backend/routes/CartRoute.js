import express from "express";
import {
    createCart,
    deleteCart,
    getCartById,
    getCarts,
    updateCart
} from "../controllers/CartController.js";

const router = express.Router();

router.get('/cart', getCarts);
router.get('/cart/:id', getCartById);
router.post('/cart', createCart);
router.patch('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart);

export default router;
