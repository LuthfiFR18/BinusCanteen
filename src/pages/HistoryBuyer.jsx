import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/HistoryBuyer.css';
import img1 from '../img/nasigoreng.png';
import HeaderCartPayment from '../components/HeaderCartPayment';
import Footer from '../components/Footer';

function HistoryBuyer() {
  const navigate = useNavigate();

  const items = [
    {
      name: 'Ayam Geprek',
      request: 'No Request',
      price: 15000,
      quantity: 1,
    },
    {
      name: 'Es Teh Manis',
      request: 'Less Sugar',
      price: 5000,
      quantity: 1,
      // imageUrl: 'https://via.placeholder.com/80', // Replace with actual image URL if available
    },
  ];

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = 500;
  const total = subtotal + tax;

  return (
    <div className="history-buyer-container">
      <HeaderCartPayment/>

      <div className="history-buyer-page">
        <h3 className='history-buyer-title'>History</h3>      
        <p className="history-buyer-date">Friday, 6 September</p>

        {/* Table History */}
        <div className="table-container">
          <table className="history-buyer-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="history-buyer-item">
                    <div>
                      <p className='history-buyer-item-text'>{item.name}</p>

                      <p className="history-buyer-request">{item.request}</p>
                    </div>
                  </td>
                  
                  <td className="history-buyer-quantity">{item.quantity} X</td>

                  <td className="history-buyer-price">{item.price.toLocaleString()}</td>
                </tr>
              ))}

                <tr>
                  <td colSpan="3" className="history-buyer-status">
                    <p className='status-label'>Status :
                      <span className='status-order-unpaid'> UNPAID</span>
                      <button className='paid-button' type='submit' onClick={()=> navigate("/payment")}>Paid Now</button>
                    </p>
                  </td>
                </tr>
            </tbody>
          </table>
          <table className="history-buyer-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="history-buyer-item">
                    <div>
                      <p className='history-buyer-item-text'>{item.name}</p>

                      <p className="history-buyer-request">{item.request}</p>
                    </div>
                  </td>
                  
                  <td className="history-buyer-quantity">{item.quantity} X</td>

                  <td className="history-buyer-price">{item.price.toLocaleString()}</td>
                </tr>
              ))}

                <tr>
                  <td colSpan="3" className="history-buyer-status">
                    <p className='status-label'>Status :
                      <span className='status-order-paid'> PAID</span>
                      <button className='paid-button' type='submit' onClick={()=> navigate("/payment")}>Buy Again</button>
                    </p>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default HistoryBuyer;