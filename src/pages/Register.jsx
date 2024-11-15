import '../style/Register.css';
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

    const [role, setSelectedRole] = useState('');
    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setSelectedRole(selectedRole);
    
        if (selectedRole === "User") {
            setRoleId(2);
        } else if (selectedRole === "Seller") {
            setRoleId(3);
        } else if (selectedRole === "Delivery") {
            setRoleId(4);
        }
    };

    const saveUser = async (e) => {
        e.preventDefault();

        console.log("saveUser called"); // To check if the function is being called

        // Check if all fields are filled
        if (!name || !email || !password || !phonenumber || !roleId) {
            setMsg("Please fill in all the fields");
            return;
        }

        if(isNaN(phonenumber)){
            setMsg("Phone Number must only include digits!");
            return;
        }

        if(phonenumber.length<10){
            setMsg("Phone Number must be atleast 10 digits!");
            return;
        }

        if(password.length < 6){
            setMsg("Password must contain at least 6 characters!");
            return;
        }

        if (password !== confPassword) {
            setMsg("Passwords do not match");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email) || !email.endsWith('.com')) {
            setMsg("Invalid email format. Email must contain '@' and end with '.com'.");
            return;
        }

        try {
            const emailResponse = await axios.get(`http://localhost:5000/user/${email}`);
            console.log(emailResponse.data); // Log the user data if found
            
            if(emailResponse.data){
                setMsg("This email has been used, please Log In!")
                return;
            }
        } catch (error) {
            console.error(error);
            setMsg("User not found.");
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

            if(roleId === 2 || roleId === 4){
                navigate("/");
            }else if(roleId === 3){
                navigate("/sellerbooth")
            }
        } catch (error) {
            if (error.response) {
            setMsg(error.response.data.msg);
            }
        }
    };

    return(
        <div className='registerpage'>
            <div className="wrapperRegister">
                <h1 className='regis-title'>Registration</h1>
                <p className='errorMsg'>{msg}</p>   
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

                <form onSubmit={saveUser}>
                    <h5 className='regisform'>Name:</h5>
                    <input className='input-register' type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Name"></input>
                    
                    <h5 className='regisform'>Phone Number:</h5>
                    <input className='input-register' type="text" value={phonenumber} onChange={(e)=> setphonenumber(e.target.value)} placeholder="Phone Number"></input>

                    <h5 className='regisform'>Email:</h5>
                    <input className='input-register' type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email"></input>
                    
                    <h5 className='regisform'>Password:</h5>
                    <input className='input-register' type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password"></input>
                    
                    <h5 className='regisform'>Confirm Password:</h5>
                    <input className='input-register' type="password" value={confPassword} onChange={(e)=> setConfPassword(e.target.value)} placeholder="Confirm Password"></input>

                    <button className="button-register" type='submit'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;