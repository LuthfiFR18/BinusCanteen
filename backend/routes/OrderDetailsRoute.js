import express from "express";
import {
    getOrderDetails,
    getOrderDetailsByOrderId,
    createOrderDetails,
    updateOrderDetails,
    deleteOrderDetails,
    getPaidOrderDetails,
    updateOrderStatus
} from "../controllers/OrderDetailsController.js";

const router = express.Router();

router.get('/orderDetails', getOrderDetails);
router.get('/orderDetails/:orderId/product', getOrderDetailsByOrderId);
router.post('/orderDetails', createOrderDetails);
router.patch('/orderDetails/:id', updateOrderDetails);
router.delete('/orderDetails/:id', deleteOrderDetails);
router.get('/paidOrderDetails', getPaidOrderDetails);
router.put('/updateOrderStatus/:id', updateOrderStatus);

export default router;