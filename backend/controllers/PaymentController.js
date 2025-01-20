import Payment from "../models/PaymentModel.js";

import { snap } from "../config/Midtrans.js";
// Mendapatkan semua pembayaran
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments); // Mengirimkan respons dalam format JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan pembayaran berdasarkan ID
export const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.json(payment); // Mengirimkan data pembayaran
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Membuat pembayaran baru
export const createPayment = async (req, res) => {
    const { orderId, paymentAmount, paymentMethod, paymentDate, paymentStatus } = req.body; // Mengambil data dari request body
    try {
        const newPayment = await Payment.create({ 
            orderId, 
            paymentAmount, 
            paymentMethod, 
            paymentDate, 
            paymentStatus 
        }); // Membuat pembayaran baru
        res.status(201).json(newPayment); // Mengirimkan data pembayaran yang baru dibuat
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Memperbarui pembayaran yang ada
export const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id); // Mencari pembayaran berdasarkan ID
        if (!payment) return res.status(404).json({ message: "Payment not found" }); // Menangani jika tidak ditemukan

        // Mengupdate data pembayaran
        const { PaymentAmount, PaymentMethod, PaymentDate, PaymentStatus } = req.body;
        payment.PaymentAmount = PaymentAmount || payment.PaymentAmount;
        payment.PaymentMethod = PaymentMethod || payment.PaymentMethod;
        payment.PaymentDate = PaymentDate || payment.PaymentDate;
        payment.PaymentStatus = PaymentStatus || payment.PaymentStatus;

        await payment.save();
        res.json(payment); // Mengirimkan data pembayaran yang diperbarui
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menghapus pembayaran
export const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id); // Mencari pembayaran berdasarkan ID
        if (!payment) return res.status(404).json({ message: "Payment not found" }); // Menangani jika tidak ditemukan

        await payment.destroy(); // Menghapus pembayaran
        res.json({ message: "Payment deleted" }); // Mengirimkan respons bahwa pembayaran dihapus
    } catch (error) {
        res.status(500).json({ message: error.message }); // Menangani error
    }
};




export const createPaymentToken = async (req, res) => {
    const { orderId, items, totalAmount, paymentMethod } = req.body;
    
    try {

        console.log('Environment variables check:');
        console.log('Server Key:', process.env.SECRET ? 'Present' : 'Missing');
        console.log('Client Key:', process.env.NEXT_PUBLIC_CLIENT ? 'Present' : 'Missing');

        console.log('Received payment request:', {
            orderId,
            items,
            totalAmount,
            paymentMethod
        });

        const parameter = {
            transaction_details: {
                order_id: String(orderId),
                gross_amount: parseInt(totalAmount)
            },
            item_details: items.map(item => ({
                id: String(item.id),
                price: parseInt(item.price),
                quantity: parseInt(item.quantity),
                name: item.name
            })),
            enabled_payments: [paymentMethod === 'BCA Virtual Account' ? 'bca_va' : 'qris']
        };

        console.log('Midtrans parameter:', parameter);

        const token = await snap.createTransactionToken(parameter);
        console.log('Token created:', token);
        res.json({ token });
    } catch (error) {
        console.error('Midtrans Error:', error);
        res.status(500).json({ 
            error: error.message,
            details: error.ApiResponse || error 
        });
    }
};