import Order from "../models/OrderModel.js";


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createOrder = async (req, res) => {
    try {
        const { userId, deliveryLocation } = req.body;
        const newOrder = await Order.create({ userId, deliveryLocation });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        const { CustomerID, BoothID, Quantity } = req.body;
        await order.update({ CustomerID, BoothID, Quantity });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        await order.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};