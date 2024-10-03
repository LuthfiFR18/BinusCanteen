import Products from "../models/ProductsModel.js";

export const getProducts = async(req, res) => {
    try {
        const product = await Products.findAll(); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

export const getProductById = async(req, res) => {
    try {
        const product = await Products.findByPk(req.params.id); 
        if (!product) return res.status(404).json({ message: "Product not found" }); 
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async(req, res) => {
    const { uuid, name, email, password,phonenumber,roleId } = req.body; 
    try {
        const newProduct = await Products.create({ uuid, name, price, productType,userId }); 
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async(req, res) => {
    try {
        const product = await Products.findByPk(req.params.id); 
        if (!user) return res.status(404).json({ message: "Product not found" }); 

        // Mengupdate data user
        const { name, price, productType,userId } = req.body;
        product.name = name || product.name;
        product.price = price || product.price;
        product.productType = productType || product.productType;
        product.roleId = roleId || product.roleId;

        await product.save(); // Menyimpan perubahan
        res.json(product); // Mengirimkan data product yang diperbarui
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const product = await Products.findByPk(req.params.id); // Mencari product berdasarkan ID
        if (!product) return res.status(404).json({ message: "User not found" }); // Menangani jika tidak ditemukan

        await product.destroy(); // Menghapus procduct
        res.json({ message: "Product deleted" }); // Mengirimkan respons bahwa user dihapus
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}