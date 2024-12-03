import React, { useState } from "react";
import '../style/OrderListSeller.css';
import PopUpOrderDone from "../components/PopUpOrderDone";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Headerseller';
import Footerseller from '../components/Footerseller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater} from '@fortawesome/free-solid-svg-icons'

const OrderListSeller = () => {
    const navigate = useNavigate();
    // const orders = [
    const [orders, setOrders] = useState([
        {
        id: 1,
        name: "Adel",
        items: ["Ayam Geprek Mozarela [2x]", "Indomie geprek [1x]"],
        description: ["Ayam Geprek Mozarela tidak pedas", "Indomie geprek level 2", "Lantai 7"],
        time: "08.30",
        },
        {
        id: 2,
        name: "Adel",
        items: ["Ayam Geprek Mozarela [2x]", "Indomie geprek [1x]"],
        description: ["Ayam Geprek Mozarela tidak pedas", "Indomie geprek level 2", "Lantai 9"],
        time: "10.30",
        },
        {
        id: 3,
        name: "Rendy",
        items: ["Ayam Geprek Mozarela [2x]", "Indomie geprek [1x]"],
        description: ["Ayam Geprek Mozarela tidak pedas", "Indomie geprek level 2", "Lantai 11"],
        time: "12.30",
        },
        {
        id: 4,
        name: "Henry",
        items: ["Ayam Geprek Mozarela [2x]", "Indomie geprek [1x]"],
        description: ["Ayam Geprek Mozarela tidak pedas", "Indomie geprek level 2", "Lantai 13"],
        time: "12.30",
        },
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleDoneClick = (orderId) => {
        setSelectedOrder(orderId);
        setPopupOpen(true);
    }

    const handleConfirm = () => {
        const confirmed = window.confirm(
            "Are you sure this order is complete? This will notify the buyer that their order is finished and ready for delivery"
        );
        if (confirmed) {
            setOrders(orders.filter((order) => order.id !== selectedOrder));
            setPopupOpen(false);
        }
    }

  return (
        <div className="order-list-container">
            <button className="order-list-seller-back-button" onClick={() => navigate('/Sellerpage')}>
                <span className="arrow-left">&#8592;</span>
            </button>
                <header>
                    <h3>Jumat 8:50</h3>
                    <p>20/09/2024</p>
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
                        {/* {orders.map((order, index) => ( */}
                        {orders.map((order, index) => (
                            // <tr key={index}>
                            <tr key={order.id}>
                                <td>{order.name}</td>
                                <td>
                                    <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>{item}</li>
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
                                <td>{order.time}</td>
                                    <td>
                                        <button className="done-button" onClick={() => handleDoneClick(order.id)}>
                                            Done
                                        </button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <PopUpOrderDone
                    isOpen={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    onConfirm={handleConfirm}
                />
        </div>
  );
};

export default OrderListSeller;
