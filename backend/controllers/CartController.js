import Cart from "../models/CartModel.js";

// Get all carts
export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get cart by ID
export const getCartById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new cart
export const createCart = async (req, res) => {
    try {
        const { ProductID, Quantity, ProductDescription } = req.body;
        const newCart = await Cart.create({ ProductID, Quantity, ProductDescription });
        res.status(201).json(newCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update existing cart
export const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        
        const { ProductID, Quantity, ProductDescription } = req.body;
        await cart.update({ ProductID, Quantity, ProductDescription });
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete cart
export const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        
        await cart.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
