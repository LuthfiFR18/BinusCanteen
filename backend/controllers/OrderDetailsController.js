import OrderDetails from "../models/OrderDetailsModel.js";
import Products from "../models/ProductsModel.js";
import Users from "../models/UserModel.js";

export const getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findAll();
        res.status(200).json(orderDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getOrderDetailsByOrderId = async (req, res) => {
    try {
        // Get userId from params
        const { userId } = req.params;
        console.log('User ID:', userId);

        // Validate userId
        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid userId parameter' });
        }

        // Fetch all OrderDetails items for the user and include product details
        const carts = await OrderDetails.findAll({
            where: { userId }, // filter by userId
            include: [
                {
                    model: Products,
                    as: 'product',
                    attributes: ['id','name', 'price'],
                },
                {
                    model: Users,
                    as: 'user',
                    attributes: ['id', 'name', 'uuid'], // Include user details (if needed)
                },
            ],
        });

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: 'No cart items found for this user' });
        }

        // Return the cart items
        return res.status(200).json({
            carts, // returns cart items with products details
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const createOrderDetails = async (req, res) => {
    try {
        const { orderId,productId,userId, quantity,productDescription,subTotal } = req.body;
        const newOrderDetails = await OrderDetails.create({ orderId,productId,userId, quantity,productDescription,subTotal });
        res.status(201).json(newOrderDetails);
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