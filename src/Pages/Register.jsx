import React from 'react';
import '../Style/Register.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
function Register(){
    const navigate = useNavigate();
    return(
        <div className='register'>
            <section className="wrapperRegister">
                <h1>Registration</h1>
                <input className='radio' type="radio"checked={true}/>
                <label className='labelRadio'>User</label>
                <input className='radio' type="radio"checked={false}/>
                <label className='labelRadio'>Seller</label>
                <input className='radio' type="radio"checked={false}/>
                <label className='labelRadio'>Delivery</label>
                
                <form action="#">
                    <h5 className='regisform'>First Name:</h5>
                    <input type="text" placeholder="First Name"></input>
                    <h5 className='regisform'>Last Name:</h5>
                    <input type="text" placeholder="Last Name"></input>
                    
                    <h5 className='regisform'>Phone Number:</h5>
                    <input type="text" placeholder="Phone Number"></input>

                    <h5 className='regisform'>Email:</h5>
                    <input type="email" placeholder="Email"></input>
                    
                    <h5 className='regisform'>Password:</h5>
                    <input type="password" placeholder="Password"></input>
                    
                    <h5 className='regisform'>Confirm Password:</h5>
                    <input type="password" placeholder="Confirm Password"></input>
                    
                    {/* <h5>Role:</h5>
                    <div className="select-menu">
                        <div className="select-btn">
                            <span class="sBtn-text">Select Role</span>
                            <i class='bx bx-chevron-down'></i>
                        </div>
                        <ul class="options">
                            <li className="option">
                                <span class="option-text">Binusian</span>
                            </li>
                            <li className="option">
                                <span class="option-text">Seller</span>
                            </li>
                            <li className="option">
                                <span class="option-text">Delivery</span>
                            </li>
                        </ul>
                    </div> */}
            </form>
            <button className='button' onClick={()=>navigate('/')}>Register</button>
            </section>
    </div>
    )
}

export default Register;