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

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const orderDetails = await OrderDetails.findAll({
            include: [
                {
                    model: Products,
                    as: 'product',
                    where: {
                        userId: userId  // Filter products by seller's userId
                    },
                    attributes: ['name', 'productDescription']
                },
                {
                    model: Order,
                    as: 'order',
                    required: true,
                    include: [
                        {
                            model: Payment,
                            required: true,
                            where: {
                                paymentStatus: 'Done'
                            },
                            attributes: ['paymentDate', 'paymentMethod']
                        },
                        {
                            model: Users,
                            as: 'user',
                            attributes: ['name']
                        }
                    ]
                }
            ],
            group: ['order.id']
        });

        const orderMap = new Map();

        orderDetails.forEach(detail => {
            const orderId = detail.orderId;
            
            if (!orderMap.has(orderId)) {
                orderMap.set(orderId, {
                    id: orderId,
                    name: detail.order.user.name,
                    items: [],
                    description: [],
                    time: detail.order.orderDate,
                    paymentDate: detail.order.payment.paymentDate,
                    paymentMethod: detail.order.payment.paymentMethod
                });
            }

            const order = orderMap.get(orderId);
            order.items.push({
                name: detail.product.name,
                price: detail.product.price,
                quantity: detail.quantity
            });
            order.description.push(detail.product.productDescription);
        });

        const formattedOrders = Array.from(orderMap.values());
        
        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching paid order details:', error);
        res.status(500).json({ message: error.message });
    }
};