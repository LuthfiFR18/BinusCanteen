import React, { useState } from "react";
import '../style/Dessertmenu.css'; // Assuming you have a CSS file for styling
import img1 from '../img/nasigoreng.png';

const Dessertmenu = () => {
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
    <div className="dessertmenu-list">
    <div className="dessert-item">
      <img src={img1}/>
      <div class="dessert-item-content">
      <h3>Nasi Goreng Nara</h3>
      <p>Rp. 18.000</p>
      </div>

      {/* Initial Order Button */}
      {!showCartControls && (
        <div className="dessert-order-button" onClick={handleShowCartControls}>
          <span>+</span>
        </div>
      )}

      {/* Cart Controls */}
      {showCartControls && (
        <div className="dessert-cart-control">
          <div className="dessert-cart-buttons">
            <button className="dessert-minplus-button" onClick={decrement}>-</button>
            <div className="dessert-quantity">{quantity}</div>
            <button className="dessert-minplus-button" onClick={increment}>+</button>
          </div>
          <button className="dessert-add-to-cart" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      )}
    </div>

    </div>
  );
};

export default Dessertmenu;