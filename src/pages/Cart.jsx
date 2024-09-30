import React, { useState } from 'react';
import '../style/Cart.css';
import img1 from '../img/nasigoreng.png'

const Cart = () => {
  const [quantities, setQuantities] = useState({
    ayam: 1,
    tea: 1
  });

  const prices = {
    ayam: 15000,
    tea: 15000
  };

  const updateQuantity = (item, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[item] + change;
      return newQuantity > 0 ? { ...prevQuantities, [item]: newQuantity } : prevQuantities;
    });
  };

  const calculateSubtotal = () => {
    return (quantities.ayam * prices.ayam) + (quantities.tea * prices.tea);
  };

  const tax = 500;
  const subtotal = calculateSubtotal();
  const total = subtotal + tax;

  const checkout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className="cart">
      <h2>FOOD CART</h2>
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
          <tr>
            <td className="item-cell">
              <img src={img1}/>
              Ayam Geprek
            </td>
            <td>
              <div className="quantity-control">
                <button onClick={() => updateQuantity('ayam', -1)}>-</button>
                <span>{quantities.ayam}</span>
                <button onClick={() => updateQuantity('ayam', 1)}>+</button>
              </div>
            </td>
            <td>
              <input className="description-input" type="text" placeholder="Tambah Keterangan (Optional)" />
            </td>
            <td>
              {prices.ayam}
            </td>
          </tr>
          <tr>
            <td className="item-cell">
              <img src={img1}/>
              Es Teh Manis
            </td>
            <td>
              <div className="quantity-control">
                <button onClick={() => updateQuantity('tea', -1)}>-</button>
                <span>{quantities.tea}</span>
                <button onClick={() => updateQuantity('tea', 1)}>+</button>
              </div>
            </td>
            <td>
              <input className="description-input" type="text" placeholder="Tambah Keterangan (Optional)" />
            </td>
            <td>
              {prices.tea}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="cart-summary">
        <div>
          <div className="summary-line">
            <span>Subtotal:</span>
            <span>{subtotal}</span>
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

      <button className="checkout" onClick={checkout}>
        CHECKOUT
      </button>
    </div>
  );
};

export default Cart;
