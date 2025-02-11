import OrderDetails from "../models/OrderDetailsModel.js";
import Products from "../models/ProductsModel.js";
import Users from "../models/UserModel.js";
import Payment from "../models/PaymentModel.js";
import Order from "../models/OrderModel.js";

export const getOrderDetails = async (req, res) => {
    try {

        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const orderDetails = await OrderDetails.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: Products,
                    as: 'product',
                    attributes: ['name'],
                },
                {
                    model: Users,
                    as: 'user',
                    attributes: ['name'],
                },
            ],
        });
        
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

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch all OrderDetails items for the user and include product details
        const orderDetails = await OrderDetails.findAll({
            where: { 
                userId: userId 
            },
            include: [
                {
                    model: Products,
                    as: 'product',
                    attributes: ['id', 'name', 'price'],
                }
            ],
        });

        // Format the response
        const products = orderDetails.map((orderDetail) => ({
            id: orderDetail.product?.id,
            name: orderDetail.product?.name,
            price: orderDetail.product?.price,
            quantity: orderDetail.quantity,
        }));
        
        return res.status(200).json({
            orderDetails: orderDetails,
            products: products
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error.message 
        });
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
        
        const { productId, userId, quantity, productDescription, subTotal } = req.body;
        await order.update({ 
            productId, 
            userId, 
            quantity, 
            productDescription, 
            subTotal 
        });
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


export const getPaidOrderDetails = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log('Request received for userId:', userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Get all products owned by this seller
        const products = await Products.findAll({
            where: { userId: userId },
            attributes: ['id', 'name']
        });

        const productIds = products.map(product => product.id);

        // Get order details for these products
        const orderDetails = await OrderDetails.findAll({
            where: {
                productId: productIds
            },
            attributes: [
                'id', 'orderId', 'productId', 'quantity', 
                'productDescription', 'createdAt'
            ]
        });

        // Get unique order IDs
        const orderIds = [...new Set(orderDetails.map(detail => detail.orderId))];

        // Get orders
        const orders = await Order.findAll({
            where: {
                id: orderIds,
                
            },
            
            attributes: ['id', 'orderDate', 'deliveryLocation', 'userId']
        });

        // Get payments for these orders
        const payments = await Payment.findAll({
            where: {
                orderId: orderIds,
                paymentStatus: 'Done'
            },
            attributes: ['orderId', 'paymentMethod', 'paymentDate']
        });

        // Get user IDs from orders
        const userIds = [...new Set(orders.map(order => order.userId))];

        // Get user details
        const users = await Users.findAll({
            where: {
                id: userIds
            },
            attributes: ['id', 'name']
        });

        // Create a map of products for quick lookup
        const productMap = products.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {});

        // Create a map of users for quick lookup
        const userMap = users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});

        // Create a map of payments for quick lookup
        const paymentMap = payments.reduce((acc, payment) => {
            acc[payment.orderId] = payment;
            return acc;
        }, {});

        // Group order details by orderId
        const orderMap = new Map();

        orderDetails.forEach(detail => {
            if (!orderMap.has(detail.orderId)) {
                const order = orders.find(o => o.id === detail.orderId);
                const payment = paymentMap[detail.orderId];
                
                if (order && payment) {  // Only include orders that have payment
                    orderMap.set(detail.orderId, {
                        id: detail.orderId,
                        name: userMap[order.userId]?.name || 'Unknown',
                        items: [],
                        description: [],
                        deliveryLocation: order.deliveryLocation,
                        paymentDate: payment.paymentDate,
                        paymentMethod: payment.paymentMethod
                    });
                }
            }

            const orderData = orderMap.get(detail.orderId);
            if (orderData) {
                orderData.items.push({
                    name: productMap[detail.productId]?.name || 'Unknown Product',
                    quantity: detail.quantity
                });
                orderData.description.push(detail.productDescription);
            }
        });

        const formattedOrders = Array.from(orderMap.values());
        
        res.status(200).json(formattedOrders);

    } catch (error) {
        console.error('Error fetching paid order details:', error);
        res.status(500).json({ 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Update order status
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update related payment record
        const payment = await Payment.findOne({
            where: { orderId: id }
        });
        
        if (payment) {
            await payment.update({ 
                paymentStatus: status,
                updatedAt: new Date()
            });
        }

        // Update order record
        await order.update({ 
            status: status,
            updatedAt: new Date()
        });

        res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: error.message });
    }
};