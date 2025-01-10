import express from "express";
import {
    getOrderDetails,
    getOrderDetailsByOrderId,
    createOrderDetails,
    updateOrderDetails,
    deleteOrderDetails
} from "../controllers/OrderDetailsController.js";

const router = express.Router();

router.get('/orderDetails', getOrderDetails);
router.get('/orderDetails/:orderId/product', getOrderDetailsByOrderId);
router.post('/orderDetails', createOrderDetails);
router.patch('/orderDetails/:id', updateOrderDetails);
router.delete('/orderDetails/:id', deleteOrderDetails);

export default router;