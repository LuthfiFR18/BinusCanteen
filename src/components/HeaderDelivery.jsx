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
        <div className="logo-delivery" onClick={()=>navigate('/deliverypage')}>
            Binus<span className='logo-text-span'>Canteen</span><span className='delivery-text'>Delivery</span>
        </div>

        <ProfileDropdown/>
        </div>
    );
}

export default HeaderDelivery;