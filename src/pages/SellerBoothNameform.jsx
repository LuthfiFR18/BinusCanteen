import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../style/SellerBoothNameform.css'
function SellerBoothNameform() {

  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (location.state && location.state.userId) {
        setUserId(location.state.userId);
    }
}, [location.state]);

useEffect(() => {
    console.log(userId); // Logs the updated userId
}, [userId]);


  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };
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

          <h5 className="image-booth-seller-text">Input Image Booth:</h5>
          <input
            type="file"
            className='input-image-booth'
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div>
              <p>Preview Image:</p>
              <img
                src={imagePreview}
                alt="Booth Preview"
                style={{ maxWidth: '300px', marginTop: '10px' }}
              />
            </div>
          )}
          <button className="submit-booth-btn" onClick={()=> navigate('/')}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SellerBoothNameform;