import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import '../style/Headeradmin.css';

import '../style/Header.css';
function Headeradmin(){

    const navigate = useNavigate();

    return(
        <div className="header">
            <nav>
                {/* <!--Logo--> */}
                <a href="#" class="logo-admin" onClick={()=>navigate('/dashboard')}>
                    <h4>BINUS <span>Canteen</span></h4>
                </a>
                 
                <div className="profile-box">
                <a href="#" className="profile-icon" onclick="toggleMenu()">
                    <FontAwesomeIcon icon={faUser} size='2x'/>
                </a>
                </div>
                </nav>
        </div>

    );
}

export default Headeradmin;