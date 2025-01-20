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
  }, [userId]); // Empty dependency array means this runs only once



  const getOrderDetailsByOrderId = async () => {
    if (!userId) {
        console.log('Waiting for userId...');
        return;
    }

    try {
        console.log('Attempting to fetch orders for userId:', userId);
        const response = await axios.get(`http://localhost:5000/orders/notPaid/${userId}`);
        console.log('Full response:', response);

        if (!response.data) {
            console.log('No data received from server');
            setOrder([]);
            return;
        }

        if (response.data.orderDetails && response.data.orderDetails.length > 0) {
          setOrder(response.data.orderDetails);
          
          setOrderId(response.data.orderDetails[0].orderId);
          console.log("Order ID set to:", response.data.orderDetails[0].orderId);
        }
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        setOrder([]);
        setMsg("Error fetching order details: " + (error.response?.data?.message || error.message));
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


  const tax = 1000;
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



  const pay = async () => {
    if (!selectedPaymentMethod) {
        setMsg("Harap pilih metode pembayaran");
        return;
    }

    if (!orderId) {
        setMsg("Order ID tidak valid");
        return;
    }

    try {
      const payloadData = {
        orderId: orderId,
        items: [
            
            ...order.map(item => ({
                id: item.product?.id,
                name: item.product?.name,
                price: item.product?.price,
                quantity: item.quantity
            })),
            // Menambahkan pajak
            {
                id: 'tax',
                name: 'Pajak',
                price: tax,
                quantity: 1
            }
        ],
        totalAmount: total,  // total akan sama dengan jumlah semua item termasuk pajak
        paymentMethod: selectedPaymentMethod
    };

        const response = await axios.post('http://localhost:5000/payment/token', payloadData);
        console.log("midtrans token: ", response.data.token);
        if (response.data.token) {
            // Handle the token...
            window.snap.pay(response.data.token, {
              onSuccess: async (result) => {
                console.log('Payment success:', result);
                await handlePaymentSuccess(result);
              },
              onPending: async (result) => {
                console.log('Payment pending:', result);
                await handlePaymentPending(result);
                setMsg("Pembayaran sedang diproses, silahkan lanjutkan pembayaran di history anda!");
              },
              onError: (error) => {
                console.error('Payment error:', error);
                setMsg("Pembayaran gagal. Silakan coba lagi.");
              },
              onClose: () => {
                setMsg("Pembayaran dibatalkan. Silakan coba lagi.");
              }
            });
        }
    } catch (error) {
        console.error("Payment error:", error);
        setMsg(error.response?.data?.error || "Terjadi kesalahan saat memproses pembayaran");
    }
  };

  const handlePaymentSuccess = async (paymentResult) => {
    try {
      
      await axios.post("http://localhost:5000/payment", {
        orderId,
        paymentAmount: total,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: "Done",
        transactionId: paymentResult.transaction_id
      });

      
      await axios.delete("http://localhost:5000/cart");
      
      
      navigate("/paymentsuccess");
    } catch (error) {
      console.error("Error updating payment status:", error);
      setMsg("Pembayaran berhasil tetapi terjadi kesalahan dalam memperbarui status");
    }
  };

  const handlePaymentPending = async (paymentResult) => {
    try {
      
      await axios.post("http://localhost:5000/payment", {
        orderId,
        paymentAmount: total,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: "Pending",
        transactionId: paymentResult.transaction_id
      });

      
      await axios.delete("http://localhost:5000/cart");
      
      
      //  navigate("/cart");
    } catch (error) {
      console.error("Error updating payment status:", error);
      setMsg("Pembayaran berhasil tetapi terjadi kesalahan dalam memperbarui status");
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-page">
        <HeaderCartPayment/>

        <h2 className='payment-title'>Payment Details</h2>
        <h5 className="countdown">Segera melakukan pembayaran sebelum {formatTime(timeLeft)}</h5>

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
                    Tidak ada keterangan
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

        <button className="payment-btn" onClick={pay}>
          PAY
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;