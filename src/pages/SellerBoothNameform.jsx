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

          <h5 className='date-booth-text'>Date Booth:</h5>
          <input type="date" className="date-booth" />


          <h5 className="time-open-booth-text">Time Open Booth:</h5>
          <input type="time" className="time-open-booth"/>

          <h5 className="time-close-booth-text">Time Close Booth:</h5>
          <input type="time" className='time-close-booth'/>
          <button className="submit-booth-btn" onClick={()=> navigate('/')}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SellerBoothNameform;