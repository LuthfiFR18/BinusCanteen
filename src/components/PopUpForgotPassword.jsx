// ForgotPasswordPopup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/PopUpForgotPassword.css'

const PopUpForgotPassword = ({ togglePopup, email, setEmail }) => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/resetpassword');
        togglePopup(); // Close popup after submit
    };

    return (
        <div className="popup-overlay-Forgot-Password">
            <div className="popup-forgot-password">
                <span className="close-popup-forgot-password" onClick={togglePopup}>×</span>
                <label>Masukkan Email Anda</label>
                <input
                    className='email-forgot-password'
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className='button-confirm-forgot-password' onClick={handleSubmit}>
                    Kirim
                </button>
            </div>
        </div>
    );
};

export default PopUpForgotPassword;
