import React, { useState, useEffect } from "react";
import '../style/Drinkmenu.css'; // Assuming you have a CSS file for styling
import img1 from '../img/nasigoreng.png';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { getMe, reset } from '../features/authSlice';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Drinkmenu = () => {
  const [quantity, setQuantity] = useState({});
  const [showCartControls, setShowCartControls] = useState({});
  const [products, setProducts] = useState([]);
  const { boothId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const { user, isError, isLoading, message } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getMe()); // Fetch user data when component mounts
    console.log(user);
}, [dispatch]);

useEffect(() => {
    if (isError) {
        console.error("Error fetching user:", message);
        navigate("/"); // Redirect if there's an error
    }
}, [isError, navigate]);

const [loadingProducts, setLoadingProducts] = useState(true);

const getProductsbyBooth = async () => {
  try {
    setLoadingProducts(true);
    const response = await axios.get(`http://localhost:5000/booth/${boothId}/products`);
    setProducts(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    setLoadingProducts(false);
  }
};

useEffect(() => {
  getProductsbyBooth();
}, [boothId]);

if (loadingProducts) return <p>Loading products...</p>;

  // Handle increment of quantity
  const increment = (uuid) => {
    setQuantity((prev) => ({ ...prev, [uuid]: (prev[uuid] || 1) + 1 }));
  };

  // Handle decrement of quantity
  const decrement = (uuid) => {
    setQuantity((prev) => {
      const currentQuantity = prev[uuid] || 1;
      if (currentQuantity > 1) {
        return { ...prev, [uuid]: currentQuantity - 1 };
      } else {
        // If quantity is 1, hide cart controls and reset quantity
        setShowCartControls((controls) => ({ ...controls, [uuid]: false }));
        return { ...prev, [uuid]: 1 };
      }
    });
  };

  // Handle showing the cart controls
  const handleShowCartControls = (uuid) => {
    setShowCartControls((controls) => ({ ...controls, [uuid]: true }));
    setQuantity((prev) => ({ ...prev, [uuid]: 1 })); // Initialize quantity to 1
  };

  // Handle adding items to the cart
  const handleAddToCart = async (uuid, name) => {
    const product = products.find((p) => p.uuid === uuid);
    alert(`You have added ${quantity[uuid] || 1} item(s) of ${name} to the cart!`);

    if (!product) return; // Avoid errors if product is not found

    console.log("Product: ", product.id);
    console.log("Quantity: ", quantity[uuid]);
    console.log("User: ", user.id);

    try {
      const response = await axios.post("http://localhost:5000/cart", {
        productId: product.id,
        quantity: quantity[uuid],
        userId: user.id,
      });
      console.log("Added to cart:", response.data);
    } catch (error) {
      if (error.response) setMsg(error.response.data.msg);
    }
    setShowCartControls((controls) => ({ ...controls, [uuid]: false }));
    setQuantity((prev) => ({ ...prev, [uuid]: 1 }));
  };

  return (
    <div className="drinkmenu-list">
      {products.length === 0 ? (
        <p className="menu-item-empty">No products available for this booth.</p>
      ) : (
        products
        .filter((product) => product.producttype === "Drink")
        .length === 0 ? ( // Check if no products of type 'Food' exist
          <p>No drink items available for this booth.</p>
        ):(
        products
        .filter((product) => product.producttype === "Drink")
        .map((product) => (
          <div className="drink-item" key={product.uuid}>
            <img src={img1} alt={`Product image of ${product.name}`}/>
            <div class="drink-item-content">
              <h3>{product.name}</h3>
              <p>Rp{product.price}</p>
            </div>

            {/* Initial Order Button */}
            {!showCartControls[product.uuid] && (
              <div className="drink-order-button" onClick={() => handleShowCartControls(product.uuid)}>
                <span>+</span>
              </div>
            )}

            {/* Cart Controls */}
            {showCartControls[product.uuid] && (
              <div className="drink-cart-control">
                <div className="drink-cart-buttons">
                  <button className="drink-minplus-button" onClick={() => decrement(product.uuid)}>-</button>
                  <div className="drink-quantity">{quantity[product.uuid] || 1}</div>
                  <button className="drink-minplus-button" onClick={() => increment(product.uuid)}>+</button>
                </div>
                <button className="drink-add-to-cart" onClick={() => handleAddToCart(product.uuid, product.name)}>
                  Add to cart
                </button>
              </div>
            )}
          </div>
        ))
      )
      )}
    </div>
  );
};

export default Drinkmenu;