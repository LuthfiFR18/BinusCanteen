import React, {useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../style/Header.css';
import ProfileDropdown from './ProfileDropdown';
import { CartContext } from '../app/CartContext';

function Header(){

    const navigate = useNavigate();
    const { cartItemCount } = useContext(CartContext);


    return(
        <div className="header-container">
            <div className="logo-text" onClick={()=>navigate('/dashboard')}>
                Binus<span className='logo-text-dashboard-span'>Canteen</span>
            </div>

            <div className="search-bar">
                <input type="text" id='search-bar-box' placeholder='Search'/>
                <button className='search-icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>

            <div className='logo-cart-box'>
                <a href="#" className='logo-cart' onClick={()=>navigate('/cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className="logo-icon" />
                    {cartItemCount > 0 && (
                        <div className="cart-notification">
                            {cartItemCount}
                        </div>
                    )}
                </a>
                <ProfileDropdown/>
            </div>
        </div>
    );
}
export default Header;