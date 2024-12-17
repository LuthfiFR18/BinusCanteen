import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../style/HeaderCartPayment.css';
import ProfileDropdown from './ProfileDropdown';
function HeaderCartPayment(){

    const navigate = useNavigate();

    return(
        <div className="header-cartpayment-container">
            <div className="logo-cartpayment-text" onClick={()=>navigate('/dashboard')}>
                Binus<span className='logo-text-cartpayment-span'>Canteen</span>
            </div>

            <div className='logo-cartpayment-box'>
                <a href="#" className='logo-cart' onClick={()=>navigate('/cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className="logo-icon" />
                </a>
                <ProfileDropdown/>
            </div>
        </div>
    );
}
        
export default HeaderCartPayment;