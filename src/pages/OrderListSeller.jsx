// import React, { useState, useEffect } from "react";
// import '../style/OrderListSeller.css';
// import PopUpOrderDone from "../components/PopUpOrderDone";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { BrowserRouter as Router, Routes, Route, Await } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/Headerseller';
// import Footerseller from '../components/Footerseller';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faUtensils,faGlassWater} from '@fortawesome/free-solid-svg-icons'
// import axios from "axios";
// import { getMe } from '../features/authSlice';
// import { useDispatch, useSelector } from 'react-redux';

// const OrderListSeller = () => {
//     const navigate = useNavigate();
//     const [orderList, setOrderList] = useState([]);
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.auth.user);

//     useEffect(() => {

//         dispatch(getMe());

//     }, [dispatch]);

//     useEffect(() => {
//         if (user && user.id) {
//             getOrderDetails();  
//         }
//     }, [user]);

//     const getOrderDetails = async () => {
//         try {
//             if (!user || !user.id) {
//                 console.error("User data is missing.");
//                 return;
//             }
//           const response = await axios.get(`http://localhost:5000/orderDetails?userId=${user.id}`);
//           setOrderList(response.data);
//           console.log(response.data);
//         } catch (error) {
//           console.error("Failed to fetch order details:", error);
//         }
//     };
    

    
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [isPopupOpen, setPopupOpen] = useState(false);

//     const handleDoneClick = (orderId) => {
//         setSelectedOrder(orderId);
//         setPopupOpen(true);
//     }

//     // const handleConfirm = () => {
//     //     const confirmed = window.confirm(
//     //         "Are you sure this order is complete? This will notify the buyer that their order is finished and ready for delivery"
//     //     );
//     //     if (confirmed) {
//     //         setOrderList(orderList.filter((order) => orderList.id !== selectedOrder));
//     //         setPopupOpen(false);
//     //     }
//     // }

  return (
        <div className="order-list-container">
            <Header/>
                <header>
                    <h3>Jumat 8:50</h3>
                    <p>20/09/2024</p>
                </header>

                
                {/* <table className="order-table">
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
                        {/* {orders.map((order, index) => (
                        {order.map((order, index) => (
                            // <tr key={index}>
                            <tr key={order.id}>
                                <td>name</td>
                                <td>
                                    <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>{item.name}</li>
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
                </table> */}

//                 <PopUpOrderDone
//                     isOpen={isPopupOpen}
//                     onClose={() => setPopupOpen(false)}
//                     // onConfirm={handleConfirm}
//                 />
//         </div>
//   );
// };

// export default OrderListSeller;
