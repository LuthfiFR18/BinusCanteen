import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import '../style/Header.css';
function Header(){

    const navigate = useNavigate();

    return(
        <div class="header">
            <nav>
                {/* <!--Logo--> */}
                <a href="#" class="logo" onClick={()=>navigate('/dashboard')}>
                    <h4>BINUS <span>Canteen</span></h4>
                </a>
                {/* <!--search bar--> */}
                <div class="search-box">
                    <div class="row">
                        <input type="text" id="input-box" placeholder="Search"
                        autocomplete="off"></input>
                        <button className='search-icon'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div class="result-box"></div>
                </div>
                
                {/* <!--Logo Cart--> */}
                <div class="logo-cart" onClick={()=>navigate('/cart')}>
                    <a href="#">
                    <FontAwesomeIcon icon={faCartShopping} />
                </a>
                </div>
                {/* <!--Profile--> */}
                <div className="profile-box">
                <a href="#" className="profile-icon" onclick="toggleMenu()">
                    {/* <div class="profile" onclick="toggleMenu()"> */}
                    <FontAwesomeIcon icon={faUser} size='2x'/>
                    {/* </div> */}
                </a>
                </div>

                <div class="sub-menu-warp" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src="/Assets/img/profile.png"></img>                            
                            <h5>Surya Kencana</h5>
                            <h6>surya.kencana@gmail.com</h6>
                        </div>
                        <a href="#">
                            <p>Setting</p>
                        </a>
    
                        <a href="#">
                            <p>History</p>
                        </a>
                        <a href="#">
                            <p>Log Out</p>
                        </a>
                    </div>
                </div>
            </nav>
        </div>

    );
}

export default Header;