import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../style/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { LogOut, reset } from "../features/authSlice";
import img1 from '../img/nasigoreng.png'

let useClickOutside = (handler) =>{
    let domNode = useRef();

useEffect(() =>{
    let maybeHandler = (event) => {
        if(!domNode.current.contains(event.target)){
            handler();
        }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () =>{
        document.removeEventListener("mousedown", maybeHandler);
    }
})
    return domNode
}


const ProfileDropdown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    // const { user } = useSelector((state) => state.auth); // Get user from the auth state

    // useEffect(() => {
    //     // Redirect to login if user is not logged in
    //     if (!user) {
    //         navigate("/");
    //     }

    //     // Reset auth state if needed (optional)
    //     return () => {
    //         dispatch(reset());
    //     };
    // }, [user, dispatch, navigate]);

    // const handleLogout = () => {
    //     dispatch(LogOut());
    //     navigate("/"); // Redirect to the login page
    // };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    let domNode = useClickOutside(() =>{
        setIsOpen(false);
    })

  return (
    <div className="profile-box" onClick={toggleDropdown} ref={domNode}>
        <FontAwesomeIcon icon={faUser} className='profile-icon' size='lg' />

        {/* Dropdown Menu */}
        {isOpen && (
            <div className="dropdown-menu">
                <div>
                    <img
                    src={img1}/>

                    {/* {user && <p>{user.name}</p>}
                    {user && <p style={{ fontSize: '12px', color: 'gray' }}>
                    {user.email}
                    </p>} */}
                </div>
                <hr />
                <ul>
                    <li>
                        <button className='changepassword-btn' onClick={() => navigate('/resetpassword')}>
                        Change Password
                        </button>
                    </li>
                    <li>
                    <button className='history-btn'onClick={() => navigate('/historybuyer')}>History</button>
                    </li>
                    <li>
                    <button className="logOut-btn" onClick={() => navigate('/')}>Log Out</button>
                    </li>
                </ul>
            </div>
        )}
    </div>
    )
};

export default ProfileDropdown;