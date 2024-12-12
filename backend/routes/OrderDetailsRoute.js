import express from "express";
import {
    getOrderDetails,
    getOrderDetailsById,
    createOrderDetails,
    updateOrderDetails,
    deleteOrderDetails
} from "../controllers/OrderDetailsController.js";

const router = express.Router();

router.get('/orderDetails', getOrderDetails);
router.get('/orderDetails/:id', getOrderDetailsById);
router.post('/orderDetails', createOrderDetails);
router.patch('/orderDetails/:id', updateOrderDetails);
router.delete('/orderDetails/:id', deleteOrderDetails);

export default router;