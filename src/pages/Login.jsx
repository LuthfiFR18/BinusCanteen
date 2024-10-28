import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginUser,reset } from "../features/authSlice.js"
import '../style/Login.css';
// import Loginwrap from '../Components/Loginwrap';

function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user, isError, isSuccess, isLoading, message} = useSelector((state)=>state.auth);

    useEffect(() => {
        const roleMap = {
            1: "Admin",
            2: "Customer",
            3: "Seller",
            4: "Delivery"
        };

        if (user || isSuccess) {
            const roleName = roleMap[user?.roleId]; // Get role name based on roleId
            console.log("Role name determined:", roleName);

            if (roleName === "Admin") {
                console.log("Admin has logged in");
                navigate("/adminbuyer");
            } else if (roleName === "Customer") {
                console.log("Customer has logged in");
                navigate("/dashboard");
            }else if(roleName === "Seller"){
                console.log("Seller has logged in");
                navigate("/sellerpage")
            }else if(roleName === "Delivery"){
                console.log("Delivery has logged in");
                navigate("/deliverypage")
            }
        }

        dispatch(reset()); // Reset auth state
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e)=>{
        e.preventDefault();
        dispatch(LoginUser({email, password}));
    };

    // useEffect(() => {
    //     console.log("User state after login attempt:", user); // Check user state after login
    // }, [user]);

    return(
        <div className="loginpage">
            <div className="wrapperLogin">
                <h1 className='login-title'>Login</h1>
                <form onSubmit={Auth}>
                {/* <form action="#"> */}
                    {isError && <p className='errorMsg'>{message}</p>}
                    <h5 className='Logintext'>Email:</h5>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
                    {/* <input type="email" placeholder="Email"></input> */}
                    <h5 className='Logintext'>Password:</h5>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password"></input>
                    {/* <input type="password" placeholder="Password"></input> */}
                    <a className="greyText" href="#" onClick={()=> navigate('/ResetPassword')}>
                        Reset Password?</a>
                    <button className="button" type='submit'>{isLoading ? 'Loading...' : 'Login'}</button>
                    {/* <button className="button" type='submit' onClick={()=> navigate('/dashboard')}>Login</button> */}
                    
                </form>
                <a className='askTxt'>Don't have account yet?<span className='greyText' href="#" onClick={()=> navigate('/register')}>Register Here</span></a>
            </div>
        </div>
    );
}

export default Login;