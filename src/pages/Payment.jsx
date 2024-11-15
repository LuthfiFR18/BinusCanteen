import React, { useState } from 'react';
import '../style/Payment.css';
import HeaderCartPayment from '../components/HeaderCartPayment';
import Footer from '../components/Footer';
import img1 from '../img/nasigoreng.png';
import bca from '../img/bca.png';
import qris from '../img/qris.png';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Payment = () => {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({
    ayam: 1,
    tea: 1
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // State for payment method

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

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const [location, setLocation] = useState('');
  const [isError, setIsError] = useState(false);

  const locations = ['Lantai 7', 'Lantai 10', 'Lantai 13', 'Lantai 16']; // Sample locations
  const subtotal = 20000;
  const tax = 500;
  const total = subtotal + tax;

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setIsError(false); // Remove error when a location is selected
  };

  // const handleSubmit = () => {
  //   if (!location) {
  //     setIsError(true); // Show error if no location is selected
  //   } else {
  //     // Process the order
  //     alert(`Order processed for delivery to ${location}`);
  //   }
  // };
  return (
    <div className="payment-container">
      <div className="payment-page">
        <HeaderCartPayment/>

        <h2 className='payment-title'>Payment Details</h2>
        <h5 className="countdown">Segera melakukan pembayaran sebelum 01:59:58</h5>
        <span className="status">Status:<span className='status-text'> Done</span></span>

        <table className="payment-table">
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
              <td className="payment-item-cell">
                <img src={img1} alt="Ayam Geprek" />
                Ayam Geprek
              </td>

              <td>
                <div className="payment-quantity-control">
                <span>{quantities.ayam}</span>
                </div>
              </td>

              <td>
                <input className="payment-description-input" type="text" placeholder="lvl 2" />
              </td>

              <td>
                {prices.ayam}
              </td>

            </tr>

            <tr>
              <td className="payment-item-cell">
                <img src={img1} alt="Es Teh Manis" />
                Es Teh Manis
              </td>

              <td>
                <div className="payment-quantity-control">
                <span>{quantities.tea}</span>
                </div>
              </td>

              <td>
                <input className="payment-description-input" type="text" placeholder="Tambah Keterangan (Optional)" />
              </td>

              <td>
                {prices.tea}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Payment Method Selection */}
        <div className="payment-method-selection">
          <div className="payment-options">
            <div className="option">
              <input
                type="radio"
                id="bca"
                name="payment"
                value="BCA Virtual Account"
                checked={selectedPaymentMethod === 'BCA Virtual Account'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="bca">
                <img src={bca} className="logo-payment" /> BCA Virtual Account
              </label>
            </div>

            <div className="option">
              <input
                type="radio"
                id="qris"
                name="payment"
                value="QRIS"
                checked={selectedPaymentMethod === 'QRIS'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="qris">
                <img src={qris} className="logo-payment" /> QRIS
              </label>
            </div>
          </div>
        </div>

        <div className="payment-subcontainer">
          <div className="payment-left-section">
            <p className="payment-error-message">*Silahkan pilih lokasi pengantaran.</p>
        
            <div className="dropdown-payment-wrapper">
              <select
                value={location}
                onChange={handleLocationChange}
                className="payment-dropdown"
              >
              <option value="">Tempat Pengantaran</option>
              {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
              ))}
              </select>
            </div>
          </div>

          <div className="payment-right-section">
            <hr className="payment-total-green-line" />
            <div className="payment-summary">

              <div>
                <div className="payment-summary-line">
                  <span>Subtotal:</span>
                  <span>{subtotal}</span>
                </div>

                <div className="payment-summary-line">
                  <span>Tax:</span>
                  <span>{tax}</span>
                </div>

                <div className="payment-summary-line">
                  <strong>Total:</strong>
                  <strong>{total}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="payment-btn" onClick={()=>navigate('/paymentFail')}>
          PAY
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
