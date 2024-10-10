import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import '../style/HeaderDelivery.css';
import ProfileDropdown from './ProfileDropdown';
import '../style/Header.css';
function HeaderDelivery(){

    const navigate = useNavigate();

    return(
        <div className="header-delivery">
            <nav>
                {/* <!--Logo--> */}
                <a href="#" class="logo-delivery" onClick={()=>navigate('/dashboard')}>
                    <h4>BINUS <span className='logo-text'>Canteen</span><span className='delivery-text'> Delivery</span></h4>
                </a>
                <ProfileDropdown/>

                </nav>
        </div>
    );
}

export default HeaderDelivery;