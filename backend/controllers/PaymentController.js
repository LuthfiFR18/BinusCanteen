import Payment from "../models/PaymentModel.js";

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
    const { OrderID, PaymentAmount, PaymentMethod, PaymentDate, PaymentStatus } = req.body; // Mengambil data dari request body
    try {
        const newPayment = await Payment.create({ 
            OrderID, 
            PaymentAmount, 
            PaymentMethod, 
            PaymentDate, 
            PaymentStatus 
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
