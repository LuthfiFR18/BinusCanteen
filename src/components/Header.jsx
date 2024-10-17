import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import img1 from '../img/nasigoreng.png'
import '../style/Header.css';
import ProfileDropdown from './ProfileDropdown';
function Header(){

    const navigate = useNavigate();

    return(
        <div class="header-container">
            <div className="header">
                {/* <!--Logo--> */}
                <div className="logo-text">
                <a href="#" class="logo" onClick={()=>navigate('/dashboard')}>
                    BINUS <span>Canteen</span>
                </a>
                </div>
                {/* <!--search bar--> */}
                <div class="search-box">
                    <div class="row">
                        <input type="text" id='input-box' placeholder="Search"
                        autocomplete="off"></input>
                        <button className='search-icon'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div class="result-box"></div>
                </div>
        
                {/* <!--Logo Cart--> */}
                <div className='logo-cart-box'>
                    <a href="#" className='logo-cart' onClick={()=>navigate('/cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className="logo-icon" />
                </a>
                </div>
                {/* <!--Profile--> */}
                <ProfileDropdown/>
                </div>
        </div>

    );
}


export default Header;