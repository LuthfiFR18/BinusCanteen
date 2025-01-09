import express from "express";
import Midtrans from "midtrans-client"

let snap = new Midtrans.Snap({
    isProduction : false,
    serverKey : process.env.SECRET,
    clientKey : process.env.SECRET_PUBLIC_CLIENT
})

import {
    createPayment,
    deletePayment,
    getPaymentById,
    getPayments,
    updatePayment
} from "../controllers/PaymentController.js";

const router = express.Router();

router.get('/payment', getPayments); // Mendapatkan semua pembayaran
router.get('/payment/:id', getPaymentById); // Mendapatkan pembayaran berdasarkan ID
router.post('/payment', createPayment); // Membuat pembayaran baru
router.patch('/payment/:id', updatePayment); // Memperbarui pembayaran yang ada
router.delete('/payment/:id', deletePayment); // Menghapus pembayaran

export default router;


export async function POST(request){
    const {id, productName, price, quantity} = await request.json()

    let parameter = {
        item_details : {
            productName : productName,
            price : price,
            quantity : quantity
        },

        payment_details : {
            orderId : id,
            grossAmount: price * quantity
        }

    }

    const token = await snap.createTransactionToken(parameter)
}