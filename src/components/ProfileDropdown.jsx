import React, { useState } from 'react';
import '../style/profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/nasigoreng.png'


const ProfileDropdown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className="profile-box" onClick={toggleDropdown}>
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

export default ProfileDropdown;