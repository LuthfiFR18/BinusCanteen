import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import PopUpOrderDone from "../components/PopUpOrderDone";

const OrderListSeller = () => {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (user && user.id) {
            getPaidOrders();
        }
    }, [user]);

    const getPaidOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:5000/paidOrderDetails?userId=${user.id}`);
            setOrderList(response.data);
            console.log('Paid orders:', response.data);
        } catch (error) {
            console.error("Failed to fetch paid orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDoneClick = async (orderId) => {
        setSelectedOrder(orderId);
        setPopupOpen(true);
    };

    const handleConfirmDone = async () => {
        try {
            // Call API to update order status
            await axios.put(`http://localhost:5000/updateOrderStatus/${selectedOrder}`, {
                status: 'Completed'
            });
            
            // Refresh the order list
            await getPaidOrders();
            
            // Close popup
            setPopupOpen(false);
            setSelectedOrder(null);
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayName = days[now.getDay()];
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const date = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();

        return {
            dayTime: `${dayName} ${hours}:${minutes}`,
            fullDate: `${date}/${month}/${year}`
        };
    };

    const dateTime = getCurrentDateTime();

    return (
        <div className="order-list-container">
            <button className="order-list-seller-back-button" onClick={() => navigate('/Sellerpage')}>
                <span className="arrow-left">&#8592;</span>
            </button>
            <header>
                <h3>{dateTime.dayTime}</h3>
                <p>{dateTime.fullDate}</p>
            </header>
            {isLoading ? (
                <div className="loading">Loading orders...</div>
            ) : (
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Delivery Location</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList && orderList.length > 0 ? (
                            orderList.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.name}</td>
                                    <td>
                                        <ul>
                                            {order.items.map((item, idx) => (
                                                <li key={idx}>
                                                    {item.name} (x{item.quantity})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            {order.description.map((desc, idx) => (
                                                <li key={idx}>{desc}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{order.deliveryLocation}</td>
                                    <td>{order.paymentMethod}</td>
                                    <td>
                                        <span className="payment-status paid">Paid</span>
                                    </td>
                                    <td>
                                        <button 
                                            className="done-button"
                                            onClick={() => handleDoneClick(order.id)}
                                        >
                                            Done
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-orders">
                                    Tidak ada pesanan yang sudah dibayar
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            <PopUpOrderDone
                isOpen={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                onConfirm={handleConfirmDone}
            />
                <PopUpOrderDone
                    isOpen={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    // onConfirm={handleConfirm}
                />
            </div>
            // <Footerseller/>
    );
    );
};

export default OrderListSeller;