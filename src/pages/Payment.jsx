// import React, { useState } from 'react';
// import '../style/Payment.css';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import img1 from '../img/nasigoreng.png'


// const Payment = () => {
//     const [quantities, setQuantities] = useState({
//         ayam: 1,
//         tea: 1
//       });
    
//       const prices = {
//         ayam: 15000,
//         tea: 15000
//       };
    
//       const updateQuantity = (item, change) => {
//         setQuantities((prevQuantities) => {
//           const newQuantity = prevQuantities[item] + change;
//           return newQuantity > 0 ? { ...prevQuantities, [item]: newQuantity } : prevQuantities;
//         });
//       };
    
//       const calculateSubtotal = () => {
//         return (quantities.ayam * prices.ayam) + (quantities.tea * prices.tea);
//       };
    
//       const tax = 500;
//       const subtotal = calculateSubtotal();
//       const total = subtotal + tax;
    

//     return(
//         <div className="payment-page">
//             <Header/>
//             <h2 className='payment-title'>Payment Details</h2>
//             <h5 className='countdown'>Segera melakukan pembayaran sebelun 01:59:58
//             <span className="status">Status:</span></h5>

//             <table className="payment-table">
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Quantity</th>
//             <th>Description</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="payment-item-cell">
//               <img src={img1}/>
//               Ayam Geprek
//             </td>
//             <td>
//               <div className="payment-quantity-control">
//                 <button  onClick={() => updateQuantity('ayam', -1)}>-</button>
//                 <span>{quantities.ayam}</span>
//                 <button onClick={() => updateQuantity('ayam', 1)}>+</button>
//               </div>
//             </td>
//             <td>
//               <input className="payment-description-input" type="text" placeholder="lvl 2" />
//             </td>
//             <td>
//               {prices.ayam}
//             </td>
//           </tr>
//           <tr>
//             <td className="payment-item-cell">
//               <img src={img1}/>
//               Es Teh Manis
//             </td>
//             <td>
//               <div className="payment-quantity-control">
//                 <button onClick={() => updateQuantity('tea', -1)}>-</button>
//                 <span>{quantities.tea}</span>
//                 <button onClick={() => updateQuantity('tea', 1)}>+</button>
//               </div>
//             </td>
//             <td>
//               <input className="payment-description-input" type="text" placeholder="Tambah Keterangan (Optional)" />
//             </td>
//             <td>
//               {prices.tea}
//             </td>
//           </tr>
//         </tbody>
//       </table>
//             <Footer/>
//         </div>
//     )
// }
// export default Payment;

import React, { useState } from 'react';
import '../style/Payment.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../img/nasigoreng.png';
import bca from '../img/bca.png';
import qris from '../img/qris.png';

const Payment = () => {
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

  const calculateSubtotal = () => {
    return (quantities.ayam * prices.ayam) + (quantities.tea * prices.tea);
  };

  const tax = 500;
  const subtotal = calculateSubtotal();
  const total = subtotal + tax;

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="payment-page">
      <Header />
      <h2 className='payment-title'>Payment Details</h2>
      <h5 className='countdown'>Segera melakukan pembayaran sebelum 01:59:58
        <span className="status">Status:</span>
      </h5>

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
                <button onClick={() => updateQuantity('ayam', -1)}>-</button>
                <span>{quantities.ayam}</span>
                <button onClick={() => updateQuantity('ayam', 1)}>+</button>
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
                <button onClick={() => updateQuantity('tea', -1)}>-</button>
                <span>{quantities.tea}</span>
                <button onClick={() => updateQuantity('tea', 1)}>+</button>
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

      <Footer />
    </div>
  );
};

export default Payment;
