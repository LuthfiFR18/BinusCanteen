import React, { useEffect, useState } from 'react';
import '../style/Payment.css';
import HeaderCartPayment from '../components/HeaderCartPayment';
import Footer from '../components/Footer';
import img1 from '../img/nasigoreng.png';
import bca from '../img/bca.png';
import qris from '../img/qris.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';


const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [order, setOrder] = useState([]); // Ensure cart is an array
  const [subTotal, setSubTotal] = useState(0);
  const [userId, setUserId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [msg, setMsg] = useState("");

  const { user } = useSelector((state) => state.auth);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // State for payment method

  useEffect(() => {
    dispatch(getMe()); // Fetch user data when component mounts
    console.log("Fetching user data...");
  }, [dispatch]);

  // This effect sets userId when user data is fetched
  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id); // Set the userId after user data is fetched
      console.log("User ID fetched:", userId); // Log user ID only once
    }
  }, [user]); // This runs only when user state changes

  // This effect fetches the cart data when userId is set
  useEffect(() => {
    // Fetch order details when the component mounts
    getOrderDetailsByOrderId();
  }, [user]); // Empty dependency array means this runs only once

  const getOrderDetailsByOrderId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/notPaid/${userId}`);
      console.log('Order Details data received:', response.data);

      if (response.data.orderIds && response.data.orderIds.length > 0) {
        setOrderId(response.data.orderIds[0]); // Set the first orderId from the array
      }
  
      // Access the carts array from the response
      if (response.data.orderDetails && Array.isArray(response.data.orderDetails)) {
        setOrder(response.data.orderDetails); // Set the cart state to the array inside the response
      } else {
        setOrder([]); // Fallback to an empty array if carts is not found or not an array
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setOrder([]); // Fallback in case of error
    }
  };

  useEffect(() => {
    const calculateNewSubtotal = () => {
      const newSubtotal = order.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + price * item.quantity;
      }, 0);
      setSubTotal(newSubtotal);
      console.log("New Subtotal Calculated:", newSubtotal);
    };
  
    calculateNewSubtotal();
  }, [order]); // Runs whenever cart changes


  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };


  const tax = 500;
  const total = React.useMemo(() => subTotal + tax, [subTotal, tax]);

  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const payment = async () =>{
    if(!selectedPaymentMethod){
      setMsg("Harap memilih salah satu payment method dibawah ini!")
    }
    try {
      // Save the order
      const response = await axios.post("http://localhost:5000/payment", {
        orderId: orderId,
        paymentAmount: total,
        paymentMethod: selectedPaymentMethod,
        paymentStatus:"Done"
      });
      console.log("Payment created successfully:", response.data);
      navigate("/paymentsuccess");

      try{
        const response = await axios.delete("http://localhost:5000/cart");
      }catch (error){
        console.error("Error deleteing cart:", error);
      return;
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      return;
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-page">
        <HeaderCartPayment/>

        <h2 className='payment-title'>Payment Details</h2>
        <h5 className="countdown">Segera melakukan pembayaran sebelum {formatTime(timeLeft)}</h5>
        {/* <span className="status">Status:<span className='status-text'> Done</span></span> */}


        {/* Table Item Order to payment */}
        <table className="payment-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {order.length > 0 ? (
              order.map((order) => (
                <tr key={order.id}>
                  <td className="payment-item-cell">
                    <img src={img1} alt="Product" />
                    {order.product ? order.product.name : 'Unknown'}
                  </td>

                  <td>
                      <span>{order.quantity}</span>
                  </td>

                  <td>
                    <input className="payment-description-input" type="text" placeholder="Tambah Keterangan (Optional)" />
                  </td>

                  <td>
                    Rp.
                    {order.product ? order.product.price*order.quantity : 'Unknown'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items in cart</td>
              </tr>
            )}
          </tbody>
        </table>

        <p className='payment-error-message'>{msg}</p>
        {/* Payment Method Selection */}
        <div className="payment-method-selection">
          <div className="payment-options">
            <div className="option">
              <input
                type="radio"
                id="bca"
                name="payment"
                value="BCA Virtual Account"
                checked={selectedPaymentMethod === 'BCA Virtual Account'}
                onChange={handlePaymentMethodChange}
              />
              <label className='payment-method'htmlFor="bca">
                <img src={bca} className="logo-payment" /> BCA Virtual Account
              </label>
            </div>

            <div className="option">
              <input
                type="radio"
                id="qris"
                name="payment"
                value="QRIS"
                checked={selectedPaymentMethod === 'QRIS'}
                onChange={handlePaymentMethodChange}
              />
              <label className='payment-method' htmlFor="qris">
                <img src={qris} className="logo-payment" /> QRIS
              </label>
            </div>
          </div>
        </div>

        <div className="payment-subcontainer">
          <div className="payment-right-section">
            <hr className="payment-total-green-line" />
            <div className="payment-summary">

              <div>
                <div className="payment-summary-line">
                  <span>Subtotal:</span>
                  <span>{subTotal}</span>
                </div>

                <div className="payment-summary-line">
                  <span>Tax:</span>
                  <span>{tax}</span>
                </div>

                <div className="payment-summary-line">
                  <strong>Total:</strong>
                  <strong>{total}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="payment-btn" onClick={payment}>
          PAY
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
