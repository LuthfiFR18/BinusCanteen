import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import '../style/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LogOut,getMe, reset } from "../features/authSlice";
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

    const { user, isError, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe()); // Fetch user data when component mounts
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching user:", message);
            navigate("/"); // Redirect if there's an error
        }
    }, [isError, navigate, message]);

    const handleLogout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/"); // Redirect to the login page
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    let domNode = useClickOutside(() =>{
        setIsOpen(false);
    })

  return (
    <div className="profile-dropdown">
    <div className="profile-box" onClick={toggleDropdown} ref={domNode}>
        <FontAwesomeIcon icon={faUser} className='profile-icon'/>

        {/* Dropdown Menu */}
        {isOpen && (
            <div className="dropdown-menu">
                <div>
                    <img
                    src={img1}/>

                    {user && <p>{user.name}</p>}
                    {user && <p style={{ fontSize: '12px', color: 'gray' }}>
                    {user.email}
                    </p>}
                </div>
                <hr />
                <ul>
                    <li>
                        <button className='changepassword-btn' onClick={() => navigate('/changepassword')}>
                        Change Password
                        </button>
                    </li>
                    <li>
                    <button className='history-btn'onClick={() => navigate('/historybuyer')}>History</button>
                    </li>
                    <li>
                    <button className="logOut-btn" onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            </div>
        )}
    </div>
    </div>
    )
};

export default ProfileDropdown;