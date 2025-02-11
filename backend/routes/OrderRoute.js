import express from "express";
import {
    getOrders,
    getOrderById,
    getOrdersWithInvalidPayment,
    createOrder,
    updateOrder,
    deleteOrder,
    deleteAllOrders,
    deleteOrderwithInvalidPayment,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get('/order', getOrders);
router.get('/order/:id', getOrderById);
router.get('/orders/notPaid/:userId', getOrdersWithInvalidPayment);
router.post('/order', createOrder);
router.patch('/order/:id', updateOrder);
router.delete('/order/:id', deleteOrder);
router.delete('/order', deleteAllOrders);
router.delete('/orders/notPaid/',deleteOrderwithInvalidPayment);

export default router;