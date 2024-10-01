import Seller from "../models/SellerModel.js";


export const getSellers = async (req, res) => {
    try {
        const sellers = await Seller.findAll(); 
        res.json(sellers); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


export const getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findByPk(req.params.id); 
        if (!seller) return res.status(404).json({ message: "Seller not found" }); 
        res.json(seller); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createSeller = async (req, res) => {
    const { uuid, boothname, openingTime, userId } = req.body; 
    try {
        const newSeller = await Seller.create({ uuid, boothname, openingTime, userId }); 
        res.status(201).json(newSeller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSeller = async (req, res) => {
    try {
        const seller = await Seller.findByPk(req.params.id); 
        if (!seller) return res.status(404).json({ message: "Seller not found" }); 

        // Mengupdate data seller
        const { boothname, openingTime, userId } = req.body;
        seller.boothname = boothname || seller.boothname;
        seller.openingTime = openingTime || seller.openingTime;
        seller.userId = userId || seller.userId;

        await seller.save(); // Menyimpan perubahan
        res.json(seller); // Mengirimkan data seller yang diperbarui
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteSeller = async (req, res) => {
    try {
        const seller = await Seller.findByPk(req.params.id); // Mencari seller berdasarkan ID
        if (!seller) return res.status(404).json({ message: "Seller not found" }); // Menangani jika tidak ditemukan

        await seller.destroy(); // Menghapus seller
        res.json({ message: "Seller deleted" }); // Mengirimkan respons bahwa seller dihapus
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
