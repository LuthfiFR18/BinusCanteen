import React from 'react';
import '../style/Register.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Register(){
    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState('user');

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    }

    const sellerRadio = document.getElementById('seller');
    const registerButton = document.getElementById('registerButton');

    const handleRegisterClick = () => {
        if (selectedRole === 'Seller') {
          navigate('/register-booth'); // Replace with the actual path to your booth registration page
        } else {
          navigate('/');
        }
      };

    return(
        <div className='bodyloginregister'>
            <section className="wrapperRegister">
                <h1>Registration</h1>
                {/* <input className='radio' type="radio"checked={true}/>
                <label className='labelRadio'>User</label>
                <input className='radio' type="radio"checked={false}/>
                <label className='labelRadio'>Seller</label>
                <input className='radio' type="radio"checked={false}/>
                <label className='labelRadio'>Delivery</label> */}
                
        <div className="role-options">
            <input
                type="radio"
                value="User"
                checked={selectedRole === 'User'}
                onChange={handleRoleChange}
                id="user"
            />
            <label htmlFor="user">User</label>
            <input
                type="radio"
                value="Seller"
                checked={selectedRole === 'Seller'}
                onChange={handleRoleChange}
                id="seller"
            />
            <label htmlFor="seller">Seller</label>
            <input
                type="radio"
                value="Delivery"
                checked={selectedRole === 'Delivery'}
                onChange={handleRoleChange}
                id="delivery"
            />
            <label htmlFor="delivery">Delivery</label>
        </div>      
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
            {/* <button className='button' onClick={()=>navigate('/')}>Register</button> */}
            <button className="button" onClick={handleRegisterClick}>{selectedRole === 'Seller' ? 'Register Your Booth' : 'Register'}</button>
            </section>
    </div>
    )
}

export default Register;