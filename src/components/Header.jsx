import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../style/Header.css';
import ProfileDropdown from './ProfileDropdown';
function Header(){

    const navigate = useNavigate();

    return(
        <div className="header-container">
            <div className="logo-text" onClick={()=>navigate('/dashboard')}>
                Binus<span className='logo-text-span'>Canteen</span>
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
                </a>
                <ProfileDropdown/>
            </div>
        </div>
        // <div className="header-container">
        //         {/* <!--Logo--> */}
        //         <div className="logo-text">
        //         <a href="#" class="logo" onClick={()=>navigate('/dashboard')}>
        //             BINUS<span>Canteen</span>
        //         </a>
        //         </div>
        //         {/* <!--search bar--> */}
        //         <div className="search-bar-container">
        //         <div class="search-box">
        //                  <input type="text" id='input-search-box' placeholder="Search"
        //                 autocomplete="off"></input>
        //                 <button className='search-icon'>
        //                 <FontAwesomeIcon icon={faMagnifyingGlass} />
        //                 </button>
        //         </div>
        //         </div>

        //         {/* <!--Logo Cart--> */}
        //         <div className='logo-cart-box'>
        //             <a href="#" className='logo-cart' onClick={()=>navigate('/cart')}>
        //             <FontAwesomeIcon icon={faCartShopping} className="logo-icon" />
        //         </a>
        //         </div>

        //         {/* <!--Profile--> */}
        //         <ProfileDropdown/>
        //         </div>
    );
}


export default Header;