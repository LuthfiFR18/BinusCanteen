import OrderDetails from "../models/OrderDetailsModel";

export const getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getOrderDetailsById = async (req, res) => {
    try {
        const order = await OrderDetails.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createOrderDetails = async (req, res) => {
    try {
        const { CustomerID, BoothID, Quantity } = req.body;
        const newOrder = await OrderDetails.create({ CustomerID, BoothID, Quantity });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateOrderDetails = async (req, res) => {
    try {
        const order = await OrderDetails.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        const { CustomerID, BoothID, Quantity } = req.body;
        await order.update({ CustomerID, BoothID, Quantity });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteOrderDetails = async (req, res) => {
    try {
        const order = await OrderDetails.findByPk(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        
        await OrderDetails.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};