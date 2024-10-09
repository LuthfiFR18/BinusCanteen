import React, { useEffect, useRef, useState } from 'react';
import '../style/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

   
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    let domNode = useClickOutside(() =>{
        setIsOpen(false);
    })

  return (
    <div className="profile-box" onClick={toggleDropdown} ref={domNode}>
        <FontAwesomeIcon icon={faUser} className='profile-icon' />

        {/* Dropdown Menu */}
        {isOpen && (
            <div className="dropdown-menu">
                <div>
                    <img
                    src={img1}/>

                    <p>Surya Kencana</p>
                    <p style={{ fontSize: '12px', color: 'gray' }}>
                    surya.kencana@example.com
                    </p>
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