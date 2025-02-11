import React from 'react'
import '../style/AvaliableDelivery.css';
import img1 from '../img/nasigoreng.png'
function AvaliableDelivery() {
  return (
    <div className="delivery-list">
        <div className="delivery-item">
            <img src={img1}/>
              <div class="delivery-item-content">
                  <h3 className='title-item'>Nasi Goreng Nara</h3>
                  <p>Nara Kitchen</p>
                  <h3 className='order-number-delivery'>01</h3>
                  <h3 className='delivery-place-order'>Lantai 7</h3>
              </div>
              
            <div className="delivery-order-button">
            <span>+</span>
            </div>
        </div>
    </div>
  )
}

export default AvaliableDelivery;