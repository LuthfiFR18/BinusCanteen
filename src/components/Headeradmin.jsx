import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import '../style/Headeradmin.css';
import ProfileDropdown from './ProfileDropdown';
import '../style/Header.css';
function Headeradmin(){

    const navigate = useNavigate();

    return(
        <div className="header-admin">
            <nav>
                {/* <!--Logo--> */}
                <a href="#" class="logo-admin" onClick={()=>navigate('/dashboard')}>
                    <h4>BINUS <span>Canteen</span></h4>
                </a>
                <ProfileDropdown/>

                </nav>
        </div>
    );
}

export default Headeradmin;