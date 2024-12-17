import React from 'react'
import '../style/PaymentSuccess.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCartPayment from '../components/HeaderCartPayment';
import Footer from '../components/Footer';

function PaymentSuccess() {

  const navigate = useNavigate();


  const subtotal = 20000;
  const tax = 500;
  const total = subtotal + tax;

  return (
    <div className="paymentsuccess-container">
      <div className="paymentsuccess-page">
        <HeaderCartPayment/>

        <h3 className="paymentsuccess-title">Payment Successfull</h3>
        <div className="underline-paymentsuccess"></div>
  
        <h3 className="paymentsuccess-titlesummary">Summary</h3>
        <div className="underline-paymentsuccess-summary"></div>

        {/* Description Item Price */}
        <div className="paymentsuccess-summary">
          <div>
            <div className="paymentsuccess-summary-line">
              <span>Subtotal:</span>
              <span>{subtotal}</span>
            </div>
            <div className="paymentsuccess-summary-line">
              <span>Tax:</span>
              <span>{tax}</span>
            </div>
            <div className="paymentsuccess-summary-line">
              <strong>Total:</strong>
              <strong>{total}</strong>
            </div>
          </div>
        </div>

        {/* Mark payment Successfull */}
        <div className="checkmark-done-container">
          <div className="checkmark-done">
            <span>&#10003;</span>
          </div>
        </div>

        {/* Button Back to Dashboard */}
        <button className='paymentsuccess-btn' onClick={()=>navigate('/dashboard')}>OK</button>
      </div>
      <Footer/>
    </div>
  )
}
export default PaymentSuccess;