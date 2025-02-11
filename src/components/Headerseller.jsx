import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import img1 from '../img/nasigoreng.png'
import '../style/Headerseller.css';
import SellerProfileDropdown from './SellerProfileDropdown';
function Headerseller(){

    const navigate = useNavigate();

    return(
        <div class="header-seller">
            <div className="logo-seller-text" onClick={()=>navigate('/sellerpage')}>
                <h4>BINUS <span className='logo-text-span'>Canteen</span><sub>Seller</sub></h4>
            </div>

            <div className="profile-box">            
                <SellerProfileDropdown/>
            </div>

        </div>

    );
}


export default Headerseller;