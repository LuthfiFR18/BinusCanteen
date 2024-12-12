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

  const [cart, setCart] = useState([]); // Ensure cart is an array
  const [subTotal, setSubTotal] = useState(0);
  const [userId, setUserId] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const [quantities, setQuantities] = useState({
    ayam: 1,
    tea: 1
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // State for payment method

  const prices = {
    ayam: 15000,
    tea: 15000
  };

  useEffect(() => {
    dispatch(getMe()); // Fetch user data when component mounts
    console.log("Fetching user data...");
  }, [dispatch]);

  // This effect sets userId when user data is fetched
  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id); // Set the userId after user data is fetched
      console.log("User ID fetched:", user.id); // Log user ID only once
    }
  }, [user]); // This runs only when user state changes

  // This effect fetches the cart data when userId is set
  useEffect(() => {
    if (userId) {
      console.log("Fetching cart for user ID:", userId); // Log when cart fetch starts
      getCartByUserId();
    }
  }, [userId]); // Dependency on userId, only runs when userId changes

  const getCartByUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      console.log('Cart data received:', response.data);
  
      // Access the carts array from the response
      if (response.data.carts && Array.isArray(response.data.carts)) {
        setCart(response.data.carts); // Set the cart state to the array inside the response
      } else {
        setCart([]); // Fallback to an empty array if carts is not found or not an array
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]); // Fallback in case of error
    }
  };

  useEffect(() => {
    const calculateNewSubtotal = () => {
      const newSubtotal = cart.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + price * item.quantity;
      }, 0);
      setSubTotal(newSubtotal);
      console.log("New Subtotal Calculated:", newSubtotal);
    };
  
    calculateNewSubtotal();
  }, [cart]); // Runs whenever cart changes

  const groupedPaymentArray = React.useMemo(() => {
    console.log("Recomputing groupedCartArray with cart:", cart);
  
    const grouped = Object.values(
      cart.reduce((acc, item) => {
        const productName = item.product ? item.product.name : "Unknown";
  
        // Ensure products with the same name or ID are grouped together
        if (!acc[productName]) {
          acc[productName] = { ...item, quantity: item.quantity };
        } else {
          acc[productName].quantity += item.quantity; // Merge quantities for same product
        }
  
        return acc;
      }, {})
    );
  
    console.log("Computed groupedCartArray:", grouped);
    
    return grouped;
  }, [cart]);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const [location, setLocation] = useState('');
  const [isError, setIsError] = useState(false);

  const subtotal = 20000;
  const tax = 500;
  const total = React.useMemo(() => subTotal + tax, [subTotal, tax]);


  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setIsError(false); // Remove error when a location is selected
  };

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

  // const handleSubmit = () => {
  //   if (!location) {
  //     setIsError(true); // Show error if no location is selected
  //   } else {
  //     // Process the order
  //     alert(`Order processed for delivery to ${location}`);
  //   }
  // };

  return (
    <div className="payment-container">
      <div className="payment-page">
        <HeaderCartPayment/>

        <h2 className='payment-title'>Payment Details</h2>
        <h5 className="countdown">Segera melakukan pembayaran sebelum {formatTime(timeLeft)}</h5>
        <span className="status">Status:<span className='status-text'> Done</span></span>


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
            {cart.length > 0 ? (
              groupedPaymentArray.map((cart) => (
                <tr key={cart.id}>
                  <td className="payment-item-cell">
                    <img src={img1} alt="Product" />
                    {cart.product ? cart.product.name : 'Unknown'}
                  </td>

                  <td>
                      <span>{cart.quantity}</span>
                  </td>

                  <td>
                    <input className="payment-description-input" type="text" placeholder="Tambah Keterangan (Optional)" />
                  </td>

                  <td>
                    Rp.
                    {cart.product ? cart.product.price*cart.quantity : 'Unknown'}
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

        <button className="payment-btn" onClick={()=>navigate('/paymentFail')}>
          PAY
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
