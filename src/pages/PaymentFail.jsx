import React from 'react'
import '../style/PaymentFail.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PaymentFail() {

    const navigate = useNavigate();


    const subtotal = 20000;
    const tax = 500;
    const total = subtotal + tax;

    return (
    <div className="paymentfail-page">
            <Header/>
        <h3 className="paymentfail-title">Payment Failed</h3>
        <div className="underline-paymentfail"></div>

        <div className="cross-container">
      <div className="cross-line cross-line-rotate-1"></div>
      <div className="cross-line cross-line-rotate-2"></div>
    </div>

        <h3 className="paymentfail-titlesummary">Please check on your saldo/choose another payment method</h3>
        <div className="underline-paymentfail-summary"></div>

        <div className="paymentfail-summary">
        <div>
          <div className="paymentfail-summary-line">
            <span>Subtotal:</span>
            <span>{subtotal}</span>
          </div>
          <div className="paymentfail-summary-line">
            <span>Tax:</span>
            <span>{tax}</span>
          </div>
          <div className="paymentfail-summary-line">
            <strong>Total:</strong>
            <strong>{total}</strong>
          </div>
        </div>
      </div>

    <button className='paymentfail-btn' onClick={()=>navigate('/payment')}>OK</button>

        <Footer/>

    </div>

  )
}

export default PaymentFail;