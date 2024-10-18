import '../style/Register.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from "axios";
import React, { useState } from "react";
import {useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [roleId, setRoleId] = useState();
    const [msg, setMsg] = useState("");

    const saveUser = async (e) => {
        e.preventDefault();

        console.log("saveUser called"); // To check if the function is being called

        if (password !== confPassword) {
            setMsg("Passwords do not match");
            return;
        }
    
        // Check if all fields are filled
        if (!name || !email || !password || !phonenumber || !roleId) {
            setMsg("Please fill in all the fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/user", {
            name: name,
            email: email,
            password: password,
            phonenumber: phonenumber,
            roleId: roleId,
            });
            console.log("Ready To be Submitted", response.data);
            console.log("User saved successfully:", response.data);
            navigate("/");
        } catch (error) {
            if (error.response) {
            setMsg(error.response.data.msg);
            }
        }
    };

    const [role, setSelectedRole] = useState('');
    // const [selectedCategory, setSelectedCategory] = useState('');
    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setSelectedRole(selectedRole);
    
        if (selectedRole === "User") {
            setRoleId(2); // Assuming 3 is for Seller
        } else if (selectedRole === "Seller") {
            setRoleId(3); // Assuming 2 is for User
        } else if (selectedRole === "Delivery") {
            setRoleId(4); // Assuming 1 is for Delivery
        }
    };

    // const handleCategoryChange = (event) => {
    //     setSelectedCategory(event.target.value);
    // }

    // const handleRegisterClick = () => {
    //     if (role === 'Seller') {
    //       navigate('/Sellerpage'); // Replace with the actual path to your booth registration page
    //     } else {
    //       navigate('/');
    //     }
    // };

    return(
        <div className='bodyloginregister'>
            <section className="wrapperRegister">
                <h1 className='regis-title'>Registration</h1>   
                <div className="role-options">
                    <input
                        type="radio"
                        value="User"
                        checked={role === 'User'}
                        onChange={handleRoleChange}
                        id="user"
                    />
                    <label htmlFor="user">User</label>
                    <input
                        type="radio"
                        value="Seller"
                        checked={role === 'Seller'}
                        onChange={handleRoleChange}
                        id="seller"
                    />
                    <label htmlFor="seller">Seller</label>
                    <input
                        type="radio"
                        value="Delivery"
                        checked={role === 'Delivery'}
                        onChange={handleRoleChange}
                        id="delivery"
                    />
                    <label htmlFor="delivery">Delivery</label>
                </div> 
                {/* <div>
                 {selectedRole === 'Seller' && (
                    <div className="category-options">
                        <h5>Select Category:</h5>
                        <div className="category-radios">
                            <div className="radio">
                                <input
                                    type="radio"
                                    value="Food"
                                    checked={selectedCategory === 'Food'}
                                    onChange={handleCategoryChange}
                                    id="food"
                                />
                                <label htmlFor="food">Food</label>
                            </div>
                            <div className="radio">
                                <input
                                    type="radio"
                                    value="Drink"
                                    checked={selectedCategory === 'Drink'}
                                    onChange={handleCategoryChange}
                                    id="drink"
                                />
                                <label htmlFor="drink">Drink</label>
                            </div>
                            <div className="radio">
                                <input
                                    type="radio"
                                    value="Dessert"
                                    checked={selectedCategory === 'Dessert'}
                                    onChange={handleCategoryChange}
                                    id="dessert"
                                />
                                <label htmlFor="dessert">Dessert</label>
                            </div>
                            <div className="radio">
                                <input
                                    type="radio"
                                    value="All Type"
                                    checked={selectedCategory === 'All Type'}
                                    onChange={handleCategoryChange}
                                    id="AllType"
                                />
                                <label htmlFor="AllType">All Type</label>
                            </div>
                        </div>
                    </div>
                )}
                </div> */}
                

                <form onSubmit={saveUser}>
                    <p className='errorMsg'>{msg}</p>
                    <h5 className='regisform'>{role === 'Seller' ? 'Booth Name:' : 'Name:'}</h5>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Name"></input>
                    
                    <h5 className='regisform'>Phone Number:</h5>
                    <input type="text" value={phonenumber} onChange={(e)=> setphonenumber(e.target.value)} placeholder="Phone Number"></input>

                    <h5 className='regisform'>Email:</h5>
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email"></input>
                    
                    <h5 className='regisform'>Password:</h5>
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"></input>
                    
                    <h5 className='regisform'>Confirm Password:</h5>
                    <input type="password" value={confPassword} onChange={(e)=> setConfPassword(e.target.value)} placeholder="Confirm Password"></input>

                    <button className="button" type='submit'>
                        {role === 'Seller' ? 'Register Your Booth' : 'Register'}
                    </button>
                </form>

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
            </section>
        </div>
    );
}

export default Register;