import React, { useState, useEffect } from "react";
import '../style/Mealsmenu.css'; // Assuming you have a CSS file for styling
import img1 from '../img/nasigoreng.png';
import axios from "axios";
import { useParams } from "react-router-dom";

const Mealsmenu = () => {
  const [quantity, setQuantity] = useState(1);
  const [showCartControls, setShowCartControls] = useState(false);
  const [products, setProducts] = useState([]);
  const { boothId } = useParams();

  const getProductsbyBooth = async () => {
    console.log('Booth ID:', boothId);
    try {
      const response = await axios.get(`http://localhost:5000/booth/${boothId}/products`);
      console.log('Fetched Products:', response.data);  // Cek data produk
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(()=>{
    console.log('Booth ID:', boothId);
    getProductsbyBooth();
    
  }, [boothId ]);


  // Handle increment of quantity
  const increment = () => {
    setQuantity(quantity + 1);
  };

  // Handle decrement of quantity
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      // If quantity is 1 and user clicks decrement, return to initial state
      setShowCartControls(false);
      setQuantity(1); // Reset quantity to 1
    }
  };

  // Handle showing the cart controls when clicking the plus button
  const handleShowCartControls = () => {
    setShowCartControls(true);
  };

  // Handle adding items to cart and then going back to the initial state
  const handleAddToCart = () => {
    alert(`You have added ${quantity} item(s) to the cart!`);
    // Reset to initial state
    setShowCartControls(false);
    setQuantity(1); // Reset quantity to 1
  };

  return (
    <div className="mealsmenu-list">
      {products.length === 0 ? (
        <p>No products available for this booth.</p>
      ) : (
        products.map((product) => (
          <div className="meals-item" key={product.uuid}>
            <img
              src={img1}
              alt={`Product image of ${product.name}`}
            />
            <div className="meals-item-content">
              <h3>{product.name}</h3>
              <p>Rp{product.price}</p>
            </div>
  
            {/* Initial Order Button */}
            {!showCartControls[product.uuid] && (
              <div className="meals-order-button" onClick={() => handleShowCartControls(product.uuid)}>
                <span>+</span>
              </div>
            )}
  
            {/* Cart Controls */}
            {showCartControls[product.uuid] && (
              <div className="meals-cart-control">
                <div className="meals-cart-buttons">
                  <button className="meals-minplus-button" onClick={decrement}>-</button>
                  <div className="meals-quantity">{quantity}</div>
                  <button className="meals-minplus-button" onClick={increment}>+</button>
                </div>
                <button className="meals-add-to-cart" onClick={handleAddToCart}>
                  Add to cart
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Mealsmenu;