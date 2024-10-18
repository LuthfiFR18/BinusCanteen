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
            <nav>
                {/* <!--Logo--> */}
                <div className="logo-text">
                <a href="#" class="logo" onClick={()=>navigate('/Sellerpage')}>
                    <h4>BINUS <span>Canteen</span><sub>Seller</sub></h4>
                </a>
                </div>

                <div className="header-middle">
                    <h2>Nasi Goreng Nara</h2>
                </div>
                
                {/* <!--Profile--> */}
                <SellerProfileDropdown/>
                    {/* <h6 className='profile-name'>Mamat<br/>
                    <span className='profile-name-span'>Mamat.kencana@gmail.com</span></h6>
                    <ul>
                    </ul> */}

                {/* </div> */}
            </nav>
        </div>

    );
}


export default Headerseller;