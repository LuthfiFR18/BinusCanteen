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
  const [subTotal, setSubTotal] = useState(0);
  const [userId, setUserId] = useState(null);
  const [productDesc, setProductDesc] = useState([])

  const { user } = useSelector((state) => state.auth);

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
          .delete(`http://localhost:5000/cart/${itemToRemove.uuid}`)
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
          .patch(`http://localhost:5000/cart/${updatedCart[index].uuid}`, {
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
                    {cart.product ? cart.product.price : 'Unknown'}
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

        <div className="cart-summary">
          <div>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>{subTotal}</span>
            </div>

            <div className="summary-line">
              <span>Tax:</span>
              <span>{tax}</span>
            </div>

            <div className="summary-line">
              <strong>Total:</strong>
              <strong>{total}</strong>
            </div>
          </div>
        </div>

        <button className="checkout" onClick={() => navigate('/payment')}>
          CHECKOUT
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
