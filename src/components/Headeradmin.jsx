import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import '../style/Headeradmin.css';
import ProfileDropdown from './ProfileDropdown';
import '../style/Header.css';
import { useState } from 'react';


function Headeradmin({search, setSearch}){

    const navigate = useNavigate();
    
    return(

        <div className="header-admin">
            <div className="logo-admin" onClick={()=>navigate('/adminbuyer')}>
                Binus<span className='logo-text-span'>Canteen</span>
            </div>

            <div class="search-box-admin">
                <div class="row">
                    <input type="text" id='input-box-admin' placeholder="Search"
                    autocomplete="off" onChange={(e)=> setSearch(e.target.value)} >
                    </input>
                    
                    <button className='search-icon-admin'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>
            <div className="profile-admin">
                <ProfileDropdown/>
            </div>
        </div>
    );
}

export default Headeradmin;