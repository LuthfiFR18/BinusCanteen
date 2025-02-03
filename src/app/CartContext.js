import React, { createContext, useState } from 'react';

// Membuat Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fungsi untuk menambah item ke cart
  const addItemToCart = () => {
    setCartItemCount(cartItemCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};