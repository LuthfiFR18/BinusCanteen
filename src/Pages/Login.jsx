import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';
// import Loginwrap from '../Components/Loginwrap';
function Login(){
    const navigate = useNavigate();
    return(
            <div className="wrapperLogin">
                <h1 className='login-title'>Login</h1>
                <form action="#">
                    <h5 className='Logintext'>Email:</h5>
                    <input type="email" placeholder="Email"></input>
                    <h5 className='Logintext'>Password:</h5>
                    <input type="password" placeholder="Password"></input>
                    <a className="greyText" href="#" onClick={()=> navigate('/ResetPassword')}>
                        Reset Password?</a>
                    <button className="button" onClick={()=> navigate('/dashboard')}>Login</button>
                    
                </form>
                <a className='askTxt'>Don't have account yet?<span className='Register' onClick={()=> navigate('/register')}>Register Here</span></a>
            </div>
    );
}

export default Login;