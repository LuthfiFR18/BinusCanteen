import Products from "../models/ProductsModel.js";
import Users from "../models/UserModel.js";
import Booth from "../models/BoothModel.js";

export const getProducts = async(req, res) => {
    try {
        const product = await Products.findAll({
            include: [{
                model: Users,
                as: 'user',
                attributes: ['name']
            }]
        }); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: "getProduct gagal" }); 
    }
}

export const getProductById = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            },
            include: [{
                model: Users,
                as: 'user',
                attributes: ['name']
            }]
        });
        if (!product) return res.status(404).json({ message: "Product not found" }); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async(req, res) => {
    const { name, price, producttype, boothId, userId  } = req.body; 
    try {
        const newProduct = await Products.create({ name, price, producttype, boothId, userId }); 
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async(req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Mengupdate data product
        const { name, price, producttype, userId } = req.body;
        product.name = name || product.name;
        product.price = price || product.price;
        product.producttype = producttype || product.producttype;
        product.boothId = boothId || product.boothId;
        product.userId = userId || product.userId;

        await product.save(); // Menyimpan perubahan
        res.json(product); // Mengirimkan data product yang diperbarui
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findOne({ where: { uuid: req.params.id } });
        if (!product) return res.status(404).json({ message: "Product not found" });

        await product.destroy();
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
