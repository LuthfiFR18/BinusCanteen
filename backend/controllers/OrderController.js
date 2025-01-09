import Order from "../models/OrderModel.js";
import { Sequelize } from "sequelize";
import OrderDetails from "../models/OrderDetailsModel.js";
import Payment from "../models/PaymentModel.js";
import Products from "../models/ProductsModel.js";
import Users from "../models/UserModel.js";

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

export const getOrdersWithInvalidPayment = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming userId is passed as a parameter in the URL

        // Step 1: Find orders with no payment or invalid payment status for a specific userId
        const orderIdsToFetch = await Order.findAll({
            where: {
                userId: userId, // Filter by userId
                [Sequelize.Op.or]: [
                    {
                        id: {
                            [Sequelize.Op.notIn]: Sequelize.literal("(SELECT orderId FROM payment)"), // No payment
                        },
                    },
                    {
                        id: {
                            [Sequelize.Op.in]: Sequelize.literal(`
                                (SELECT orderId FROM payment WHERE paymentStatus IN ('Pending') OR paymentStatus IS NULL)
                            `), // Pending or null payment
                        },
                    },
                ],
            },
            attributes: ['id'], // Fetch only the order IDs
        });

        // Extract the order IDs to fetch
        const orderIds = orderIdsToFetch.map(order => order.id);

        if (orderIds.length > 0) {
            // Step 2: Get the order details based on the orderIds and userId
            const orderDetails = await OrderDetails.findAll({
                where: {
                    orderId: {
                        [Sequelize.Op.in]: orderIds,
                    },
                    userId: userId, // Ensure orderDetails match the userId
                },
                include: [
                    {
                        model: Products,
                        as: 'product', // Alias for the related model
                        attributes: ['id', 'name', 'price'], // Only the fields you need
                    },
                    {
                        model: Users,
                        as: 'user', // Alias for the related model
                        attributes: ['id', 'name', 'uuid'], // Only the fields you need
                    }
                ],
            });

            // Return the order details along with their corresponding orderId
            res.status(200).json({
                message: `${orderDetails.length} order details found for user ${userId}.`,
                orderDetails,
                orderIds,
            });
        } else {
            res.status(404).json({ message: "No orders found with invalid payments for this user." });
        }
    } catch (error) {
        console.error(`Error retrieving orders: ${error.message}`);
        res.status(500).json({ message: `Error retrieving orders: ${error.message}` });
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

export const deleteAllOrders = async (req, res) => {
    try {
        await OrderDetails.destroy({ where: {} }); // Delete all order details
        // Delete all orders
        await Order.destroy({
            where: {}, // Empty condition to target all records
        });
        
        res.status(204).send(); // No content, successful operation
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrderwithInvalidPayment = async (req, res) => {
    try {
        // Step 1: Find orders with no payment or invalid payment status
        const orderIdsToDelete = await Order.findAll({
            where: {
                [Sequelize.Op.or]: [
                    {
                        id: {
                            [Sequelize.Op.notIn]: Sequelize.literal("(SELECT orderId FROM payment)"), // No payment
                        },
                    },
                    {
                        id: {
                            [Sequelize.Op.in]: Sequelize.literal(`
                                (SELECT orderId FROM payment WHERE paymentStatus IN ('Pending') OR paymentStatus IS NULL)
                            `), // Pending or null payment
                        },
                    },
                ],
            },
            attributes: ['id'], // Fetch only the order IDs
        });

        // Extract the order IDs to delete
        const orderIds = orderIdsToDelete.map(order => order.id);

        if (orderIds.length > 0) {
            // Step 2: Delete related OrderDetails first
            await OrderDetails.destroy({
                where: {
                    orderId: {
                        [Sequelize.Op.in]: orderIds,
                    },
                },
            });

            console.log(`${orderIds.length} order details have been deleted.`);

            // Step 3: Delete the orders
            const deletedCount = await Order.destroy({
                where: {
                    id: {
                        [Sequelize.Op.in]: orderIds,
                    },
                },
            });

            res.status(200).json({ message: `${deletedCount} orders have been deleted.` });
        } else {
            res.status(404).json({ message: "No orders found with invalid payments." });
        }
    } catch (error) {
        console.error(`Error deleting orders: ${error.message}`);
        res.status(500).json({ message: `Error deleting orders: ${error.message}` });
    }
};  