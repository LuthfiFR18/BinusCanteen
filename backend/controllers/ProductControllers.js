import Products from "../models/ProductsModel.js";
import Users from "../models/UserModel.js";
import Booth from "../models/BoothModel.js";
import upload from '../middleware/uploadConfig.js'; 

export const getProducts = async(req, res) => {
    try {
        const product = await Products.findAll({
            include: [{
                model: Users,
                as: 'user',
                attributes: ['name']
            },
            {
              model: Booth,
              as: 'booth',
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
                uuid: req.params.uuid
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
    const { image, name, price, producttype, boothId, userId  } = req.body; 
    
    try {
        console.log("Request body received:", req.body);
        const { image, name, price, producttype, boothId, userId } = req.body;

 
        const newProduct = await Products.create({ image, name, price: parseInt(price), producttype, boothId, userId });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error while creating product:", error);
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
        const { image, name, price, producttype, boothId, userId } = req.body;
        product.image = image || product.image;
        product.name = name || product.name;
        product.price = price || product.price;
        product.producttype = producttype || product.producttype;
        product.boothId = boothId || product.boothId;
        product.userId = userId || product.userId;

        await product.save(); // Menyimpan perubahan
        res.json(product); // Mengirimkan data product yang diperbarui
    } catch (error) {
        console.error("Error while updating product:", error);
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
        console.error("Error while deleting product:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getProductsByBooth = async (req, res) => {
    try {
        const boothId = req.params.boothId; // Mendapatkan boothId dari parameter URL
        const products = await Products.findAll({
            where: { boothId: boothId }, // Menyaring produk berdasarkan boothId
            include: [{
                model: Booth,
                as: 'booth',
                attributes: ['name']
            },
            {
                model: Users,
                as: 'user',
                attributes: ['name']
            }]
        });
        res.json(products); // Mengembalikan daftar produk yang ditemukan
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

