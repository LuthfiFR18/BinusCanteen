import React from 'react'
import '../style/UpdateAdmin.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function UpdateAdmin() {

  const navigate = useNavigate();

  return (
    <div className="update-admin-container">
    <div className="wrapper-update-admin">
      <h1 className='update-title'>Update <br /> Customer</h1>

      <form action="#">
          <h5 className='updateform'>Name:</h5>
          <input type="text" placeholder="Name"></input>
              
          <h5 className='updateform'>Phone Number:</h5>
          <input type="text" placeholder="Phone Number"></input>

          <h5 className='updateform'>Email:</h5>
          <input type="email" placeholder="Email"></input>
              
          <h5 className='updateform'>Password:</h5>
          <input type="password" placeholder="Password"></input>
              
          <h5 className='updateform'>Confirm Password:</h5>
          <input type="password" placeholder="Confirm Password"></input>
      </form>

      <button className="button-update" onClick={()=> navigate('/adminbuyer')}>
        Update
      </button>
    </div>
    </div>
    )
}

export default UpdateAdmin;