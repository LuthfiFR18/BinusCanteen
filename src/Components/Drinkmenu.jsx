import React, { useState } from "react";
import '../style/Drinkmenu.css'; // Assuming you have a CSS file for styling
import img1 from '../img/nasigoreng.png';
const Drinkmenu = () => {
  const [quantity, setQuantity] = useState(1);
  const [showCartControls, setShowCartControls] = useState(false);

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
    <div className="drinkmenu-list">
    <div className="drink-item">
      <img src={img1}/>
      <div class="drink-item-content">
      <h3>Nasi Goreng Nara</h3>
      <p>Rp. 18.000</p>
      </div>

      {/* Initial Order Button */}
      {!showCartControls && (
        <div className="drink-order-button" onClick={handleShowCartControls}>
          <span>+</span>
        </div>
      )}

      {/* Cart Controls */}
      {showCartControls && (
        <div className="drink-cart-control">
          <div className="drink-cart-buttons">
            <button className="drink-minplus-button" onClick={decrement}>-</button>
            <div className="drink-quantity">{quantity}</div>
            <button className="drink-minplus-button" onClick={increment}>+</button>
          </div>
          <button className="drink-add-to-cart" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      )}
    </div>

    </div>
  );
};

export default Drinkmenu;