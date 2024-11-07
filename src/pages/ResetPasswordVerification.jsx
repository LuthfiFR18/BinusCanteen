import React from 'react'
import '../style/ResetPasswordVerification.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ResetPasswordVerification() {
    const navigate = useNavigate();

  return (
    <div className='ResetPasswordVerification-container'>
        <div className="wrapper-reset-password">
        <form action="#">
            <h3>Email Verification</h3>
            <h5 className='veriftext'>Email:</h5>
                <input className='sadasad' type="text" placeholder="Email"></input>

            <button className="verification-email-btn" onClick={()=> navigate('/resetpassword')}>Verify</button>
        </form>
        </div>
    </div>
    )
}

export default ResetPasswordVerification;