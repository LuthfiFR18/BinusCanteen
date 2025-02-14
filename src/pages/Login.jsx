import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LoginUser,reset } from "../features/authSlice.js"
import '../style/Login.css';

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
            3: "Delivery",
            4: "Seller"
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

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    
        return(
            <div className="login-container">
            <div className="loginpage">
                <div className="wrapperLogin">
                    <h1 className='login-title'>Login</h1>

                    {/* Login Form */}
                    <form onSubmit={Auth}>
                        {isError && <p className='errorMsg'>{message}</p>}
                        <h5 className='Loginpasstext'>Email:</h5>
                        <input className='inputLogin' type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"></input>
                        <h5 className='Loginpasstext'>Password:</h5>
                        <input className='inputPassword' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Password"></input>
                        <a className="greyText" href="#" onClick={()=> navigate('/resetpasswordverification')}>
                        Forgot Password?</a>

                        <button className="button" type='submit'>{isLoading ? 'Loading...' : 'Login'}</button>
                        
                    </form>

                    <a className='askTxt'>Don't have account yet?<span className='greyText' href="#" onClick={()=> navigate('/register')}>Register Here</span></a>
                </div>
            </div>

            </div>
                
        );
}

export default Login;