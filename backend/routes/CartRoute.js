import express from "express";
import {
    createCart,
    deleteCart,
    // getCartById,
    getCarts,
    updateCart,
    getCartByUserId,
    calculateSubTotal,
    // getCartByUserId,
    // updateQuantity
} from "../controllers/CartController.js";

const router = express.Router();

router.get('/cart', getCarts);
router.get('/cart/:userId', getCartByUserId);
router.post('/cart', createCart);
router.patch('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart);
router.get("/cart/subTotal/:userId", calculateSubTotal);
// router.post("cart/update-quantity", updateQuantity);

export default router;
