import React, { useEffect, useState } from 'react';
import '../style/ResetPasswordVerification.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ResetPasswordVerification() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const {isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching user:", message);
            navigate("/"); // Redirect if there's an error
        }
    }, [isError, navigate, message]);

    const emailVerification = async (e) => {
        e.preventDefault();

        if (!email) {
            setMsg("Please fill in your email!");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/user/${email}`);
            console.log(response.data); // Log the user data if found
            
            navigate("/resetpassword", { state: { email } });
        } catch (error) {
            console.error(error);
            setMsg("User not found.");
        }

    };

  return (
    <div className='ResetPasswordVerification-container'>
        <div className="wrapper-reset-password">
            <form action="#">
                <h3>Email Verification</h3>
                {msg && <p>{msg}</p>}
                <h5 className='veriftext'>Email:</h5>
                <input className='password-verif-input' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                <button className="verification-email-btn" onClick={emailVerification}>Verify</button>
            </form>
        </div>
    </div>
    )
}
export default ResetPasswordVerification;