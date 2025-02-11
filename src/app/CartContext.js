import React, { createContext, useState } from "react";

// Membuat Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Fungsi untuk menambah item ke cart
  const addItemToCart = () => {
    setCartItemCount(cartItemCount + 1);
  };

  // Fungsi untuk mengurangi item dari cart
  const removeItemFromCart = () => {
    setCartItemCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  // Fungsi untuk mengosongkan cart setelah pembayaran
  const clearCart = () => {
    setCartItemCount(0);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};