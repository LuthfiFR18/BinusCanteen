import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../style/SellerBoothNameform.css';
import axios from 'axios';
function SellerBoothNameform() {

  const navigate = useNavigate();
  const location = useLocation();

  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState('');
  const [boothName, setBoothName] = useState('');
  const [opening, setOpening] = useState('');
  const [closing, setClosing] = useState('');

  useEffect(() => {
      console.log("Location state:", location.state);
      if (location.state?.userId) {
          setUserId(location.state.userId);
          console.log("User ID set to:", location.state.userId);
      } else {
          console.log("No userId found in location.state");
          setUserId("defaultUserId"); // Or handle the case appropriately
      }
  }, [location.state]);

  const saveBooth = async (e) => {
    e.preventDefault();

        console.log("saveBooth is called"); // To check if the function is being called

        if (!boothName || !opening || !closing) {
          setMsg("Please fill in all the fields");
          return;
      }

      try {
        const response = await axios.post("http://localhost:5000/booth", {
        name: boothName,
        openingTime: opening,
        closingTime: closing,
        userId: userId,
        });
        console.log("Ready To be Submitted", response.data);
        console.log("Booth saved successfully:", response.data);

        navigate("/");

    } catch (error) {
        if (error.response) {
        setMsg(error.response.data.msg);
        }
    }
  };


  return (
    <div className='seller-booth-form-container'>
      <div className="seller-booth-form-wrapper">
        <h3 className="booth-title">Enter Your Booth Name</h3>
        <p className='errorMsg'>{msg}</p>

        <form onSubmit={saveBooth}>
          <h5 className='booth-label'>Booth Name:</h5>
          <input className='booth-input' type="text" onChange={(e)=> setBoothName(e.target.value)} placeholder='Booth Name' />

          <h5 className="time-open-booth-text">Time Open Booth:</h5>
          <input type="time" className="time-open-booth" onChange={(e)=> setOpening(e.target.value)}/>

          <h5 className="time-close-booth-text">Time Close Booth:</h5>
          <input type="time" className="time-open-booth" onChange={(e)=> setClosing(e.target.value)}/>

          <button className="submit-booth-btn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SellerBoothNameform;