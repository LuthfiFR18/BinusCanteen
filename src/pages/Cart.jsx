import React, { useEffect, useState } from 'react';
import '../style/Cart.css';
import HeaderCartPayment from '../components/HeaderCartPayment';
import Footer from '../components/Footer';
import axios from 'axios';
import img1 from '../img/nasigoreng.png';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]); // Ensure cart is an array
  const [course, setCourse] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [userId, setUserId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [delOrderId, setDelOrderId] = useState(null);
  const [productDescription, setProductDescription] = useState('');


  const { user } = useSelector((state) => state.auth);

  const [room, setRoom] = useState('');
  const [isError, setIsError] = useState(false);
  // const rooms = ['Lantai 7 - A0708 - 08.50', 'Lantai 10 - A1001 - 08.50', 'Lantai 13 - A1302 - 08.50', 'Lantai 16 - A1604 - 13.20']; // Sample locations

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
    setIsError(false); // Remove error when a location is selected
  };

  // This effect fetches user data
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

  useEffect(() => {
    if (userId) {
      console.log("Fetching course for user ID:", userId); // Log when cart fetch starts
      getCourseByUserId();
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

  const getCourseByUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/courses/${userId}`);
      console.log('Course data received:', response.data);

      if (response.data.courses && Array.isArray(response.data.courses)) {
        setCourse(response.data.courses); // Set the cart state to the array inside the response
      } else {
        setCourse([]); // Fallback to an empty array if carts is not found or not an array
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setCart([]); // Fallback in case of error
    }
  };

  const updateQuantity = async (productId, change) => {
    if (!productId) {
      console.error("Invalid productId:", productId);
      return;
    }
  
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const index = updatedCart.findIndex((item) => item.productId === productId);
  
      if (index === -1) {
        console.error("Product not found in cart:", productId);
        return prevCart; // No changes if the product is not found
      }
  
      const updatedQuantity = updatedCart[index].quantity + change;
  
      if (updatedQuantity <= 0) {
        // Remove the item from the cart if quantity is 0
        const itemToRemove = updatedCart[index];
        updatedCart.splice(index, 1);
  
        // Sync with backend to remove the item
        axios
          .delete(`http://localhost:5000/cart/${itemToRemove.id}`)
          .then(() => {
            console.log("Item removed successfully:", itemToRemove);
          })
          .catch((error) => {
            console.error("Error during item removal:", error);
          });
      } else {
        // Update the item quantity
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedQuantity,
        };
  
        // Sync with backend to update the quantity
        axios
          .patch(`http://localhost:5000/cart/${updatedCart[index].id}`, {
            quantity: updatedCart[index].quantity,
          })
          .then((response) => {
            console.log("Quantity updated successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error during quantity update:", error);
          });
      }
  
      return updatedCart; // Update the state
    });
  };

  const saveOrder = async () => {
    let orderId;

    try {
      // Send DELETE request to the backend to delete all orders
      const response = await axios.delete('http://localhost:5000/orders/notPaid');
      console.log("orders deleted successfully:", response);
      // alert("orders have been deleted successfully!");
    } catch (error) {
      console.error("Error deleting all orders:", error);
      // alert("Failed to delete all orders. Please try again later.");
    }
  
    try {
      // Save the order
      const response = await axios.post("http://localhost:5000/order", {
        userId: userId,
        deliveryLocation: room,
      });
      console.log("Order created successfully:", response.data);
      orderId = response.data.id;
      setOrderId(orderId);
    } catch (error) {
      console.error("Error creating order:", error);
      return;
    }
  
    if (!cart || Object.keys(cart).length === 0) {
      console.error("Cart is empty. Cannot create order details.");
      return;
    }
  
    // Iterate over the groupedCartArray or cart to create order details for each product
    for (const cartItem of groupedCartArray) {
      const payload = {
        orderId,
        userId: userId,
        productId: cartItem.product?.id, // Ensure you get productId from cartItem.product
        quantity: cartItem.quantity, // Ensure you get quantity from cartItem
        productDescription: cartItem.productDescription || "", // Assuming productDescription is optional
        subTotal: cartItem.product?.price * cartItem.quantity, // Calculate subTotal if price is available
      };
  
      console.log("Order Details Payload:", payload);
  
      try {
        const response = await axios.post("http://localhost:5000/orderDetails", payload);
        console.log("Order detail saved successfully:", response.data);
        navigate("/payment");
      } catch (error) {
        console.error("Error saving order detail for product:", cartItem.product?.id, error);
      }
    }
  };
  
  
  
  useEffect(() => {
    if (orderId !== null) {
      console.log("Updated Order Id: ", orderId);
    }
  }, [orderId]);
  

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
  
  const groupedCartArray = React.useMemo(() => {
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

  const tax = 500;
  const total = React.useMemo(() => subTotal + tax, [subTotal, tax]);

  return (
    <div className="cart-container">
      <div className="cart">
        <HeaderCartPayment />
        <h2 className='cart-title'>FOOD CART</h2>

        <table className="cart-table">
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
              groupedCartArray.map((cart) => (
                <tr key={cart.id}>
                  <td className="cart-item-cell">
                    <img src={img1} alt="Product" />
                    {cart.product ? cart.product.name : 'Unknown'}
                  </td>

                  <td>
                    <div className="cart-quantity-control">
                       <button
                            onClick={() => {
                              console.log("Updating product:", cart.product);
                              updateQuantity(cart.product?.id, -1);
                            }}
                          >
                            -
                          </button>
                          <span>{cart.quantity}</span>
                          <button
                            onClick={() => {
                              console.log("Updating product:", cart.product);
                              updateQuantity(cart.product?.id, 1);
                            }}
                          >
                            +
                          </button>
                    </div>
                  </td>

                  <td>
                    <input className="cart-description-input" type="text" placeholder="Tambah Keterangan (Optional)" />
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

        <div className="cart-subcontainer">
          <div className="cart-left-section">
              <p className="cart-error-message">*Silahkan pilih lokasi pengantaran.</p>
          
              <div className="dropdown-cart-wrapper">
                <select
                  value={room}
                  onChange={handleRoomChange}
                  className="cart-dropdown"
                >
                <option value="">Tempat Pengantaran</option>
                {course.map((course) => (
                <option key={course.id} value={`${course.courseRoom},${course.endTime}`}>
                {course.courseRoom} - {course.endTime}
              </option>
              
                ))}
                </select>
              </div>
            </div>

          <div className="cart-summary">
            <div>
              <div className="summary-line">
                <span>Subtotal:</span>
                <span>Rp.{subTotal}</span>
              </div>

              <div className="summary-line">
                <span>Tax:</span>
                <span>Rp.{tax}</span>
              </div>

              <div className="summary-line">
                <strong>Total:</strong>
                <strong>Rp.{total}</strong>
              </div>
            </div>
          </div>
        </div>
        <button className="checkout" onClick={saveOrder}>
          CHECKOUT
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
