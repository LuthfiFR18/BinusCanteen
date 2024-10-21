import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import '../style/Headeradmin.css';
import ProfileDropdown from './ProfileDropdown';
import '../style/Header.css';
import { useState } from 'react';


function Headeradmin({search, setSearch}){

    const navigate = useNavigate();
    
    return(
        <div className="header-admin">
            <nav>
                {/* <!--Logo--> */}
                <a href="#" class="logo-admin" onClick={()=>navigate('/dashboard')}>
                    <h4>BINUS <span>Canteen</span></h4>
                </a>

                <div class="search-box-admin">
                    <div class="row">
                        <input type="text" id='input-box-admin' placeholder="Search"
                        autocomplete="off" onChange={(e)=> setSearch(e.target.value)} >
                        </input>
                        <button className='search-icon'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <div class="result-box"></div>
                </div>
                <ProfileDropdown/>

                </nav>
            </div>
    );
}

export default Headeradmin;