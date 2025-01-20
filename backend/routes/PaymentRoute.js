import express from "express";

import {
    createPayment,
    deletePayment,
    getPaymentById,
    getPayments,
    updatePayment,
    createPaymentToken
} from "../controllers/PaymentController.js";

const router = express.Router();

router.get('/payment', getPayments); // Mendapatkan semua pembayaran
router.get('/payment/:id', getPaymentById); // Mendapatkan pembayaran berdasarkan ID
router.post('/payment', createPayment); // Membuat pembayaran baru
router.patch('/payment/:id', updatePayment); // Memperbarui pembayaran yang ada
router.delete('/payment/:id', deletePayment); // Menghapus pembayaran
router.post('/payment/token', createPaymentToken);


export default router;
