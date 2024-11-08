import React, { useEffect, useRef, useState } from 'react';
import '../style/SellerProfile.css';
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


const SellerProfileDropdown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

   
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    let domNode = useClickOutside(() =>{
        setIsOpen(false);
    })

  return (
    <div className="profile-box-seller" onClick={toggleDropdown} ref={domNode}>
        <FontAwesomeIcon icon={faUser} className='profile-icon' />

        {/* Dropdown Menu */}
        {isOpen && (
            <div className="dropdown-menu-profile-seller">
                <div>
                    <img className='img-profile-seller'
                    src={img1}/>

                    <p>Nasi Goreng Nara</p>
                    <p>Surya Kencana</p>
                    <p style={{ fontSize: '12px', color: 'gray' }}>
                    surya.kencana@example.com
                    </p>
                </div>
                <hr />
                <ul>
                    <li>
                        <button className='changepassword-btn' onClick={() => alert('Change Password Clicked')}>
                        Change Password
                        </button>
                    </li>
                    <li>
                    <button className='history-btn'onClick={() => alert('History Clicked')}>History</button>
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

export default SellerProfileDropdown;