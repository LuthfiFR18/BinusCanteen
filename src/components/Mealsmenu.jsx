import React, { useState, useEffect } from "react";
import '../style/Mealsmenu.css';
import img1 from '../img/nasigoreng.png';
import axios from "axios";
import { useParams } from "react-router-dom";

const Mealsmenu = () => {
  const [quantity, setQuantity] = useState({});
  const [showCartControls, setShowCartControls] = useState({});
  const [products, setProducts] = useState([]);
  const { boothId,boothName } = useParams();

  const getProductsbyBooth = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/booth/${boothId}/products`);
      console.log("Booth ID:", boothId);
      console.log("Booth Name:", boothName);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProductsbyBooth();
  }, [boothId]);

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
  const handleAddToCart = (uuid, name) => {
    alert(`You have added ${quantity[uuid] || 1} item(s) of ${name} to the cart!`);
    // Reset to initial state
    setShowCartControls((controls) => ({ ...controls, [uuid]: false }));
    setQuantity((prev) => ({ ...prev, [uuid]: 1 }));
  };


  return (
    <div className="mealsmenu-list">
      {products.length === 0 ? (
        <p>No products available for this booth.</p>
      ) : (
        products
        .filter((product) => product.producttype === "Food")
        .length === 0 ? ( // Check if no products of type 'Food' exist
          <p>No food items available for this booth.</p>
        ):(products
          .filter((product) => product.producttype === "Food")
          .map((product) => (
            <div className="meals-item" key={product.uuid}>
              <img src={img1} alt={`Product image of ${product.name}`} />
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
                    <button
                      className="meals-minplus-button"
                      onClick={() => decrement(product.uuid)}
                    >
                      -
                    </button>
                    <div className="meals-quantity">{quantity[product.uuid] || 1}</div>
                    <button
                      className="meals-minplus-button"
                      onClick={() => increment(product.uuid)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="meals-add-to-cart"
                    onClick={() => handleAddToCart(product.uuid, product.name)}
                  >
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

export default Mealsmenu;
