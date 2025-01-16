import React, { useState, useEffect } from "react";
import '../style/OrderListSeller.css';
import PopUpOrderDone from "../components/PopUpOrderDone";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route, Await } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Headerseller';
import Footerseller from '../components/Footerseller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { getMe } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const OrderListSeller = () => {
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

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
            if (!user || !user.id) {
                console.error("User data is missing.");
                return;
            }
            const response = await axios.get(`http://localhost:5000/paidOrderDetails?userId=${user.id}`);
            setOrderList(response.data);
            console.log('Paid orders:', response.data);
        } catch (error) {
            console.error("Failed to fetch paid orders:", error);
        }
    };
    

    
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleDoneClick = (orderId) => {
        setSelectedOrder(orderId);
        setPopupOpen(true);
    }



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
                <table className="order-table">
                    <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Jam Pengiriman</th>
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
                                        {order.items && order.items.map((item, idx) => (
                                            <li key={idx}>
                                                {item.name} (x{item.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {order.description && order.description.map((desc, idx) => (
                                            <li key={idx}>{desc}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{new Date(order.time).toLocaleTimeString('id-ID')}</td>
                                <td>{order.paymentMethod}</td>
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
                            <td colSpan="6" style={{textAlign: 'center'}}>Tidak ada pesanan yang sudah dibayar</td>
                        </tr>
                    )}
                </tbody>
                </table>

                <PopUpOrderDone
                    isOpen={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    // onConfirm={handleConfirm}
                />
        </div>
  );
};

export default OrderListSeller;
