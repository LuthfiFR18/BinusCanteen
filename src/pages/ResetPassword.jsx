import '../style/ResetPassword.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import axios from 'axios';

function ResetPassword() {
    const navigate = useNavigate();

  return (
    <div className='resetPassword'>
        <div className="wrapperResetpassword">
            <h1>Reset Password</h1>
            <form action="#">
                <h5 className='resetText'>New Password:</h5>
                <input type="Password" placeholder="New Password"></input>
                <h5 className='resetText'>Confirm New Password:</h5>
                <input type="password" placeholder="Confirm Password"></input>
                <button className="button-save-cancel-password" onClick={()=> navigate('/')}>Save</button>
            </form>
        </div>
    </div>
  );
}

export default ResetPassword