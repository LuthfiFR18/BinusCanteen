import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/SellerBoothNameform.css'
function SellerBoothNameform() {

  const navigate = useNavigate();

  return (
    <div className='seller-booth-form-container'>
      <div className="seller-booth-form-wrapper">
        <h3 className="booth-title">Enter Your Booth Name</h3>
        <form action="#">
          <h5 className='booth-label'>Booth Name:</h5>
          <input className='booth-input' type="text" placeholder='Booth Name' />
          <button className="submit-booth-btn" onClick={()=> navigate('/')}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SellerBoothNameform;