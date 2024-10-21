import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faStore, faTruck} from '@fortawesome/free-solid-svg-icons'
import Mealsmenu from '../components/Mealsmenu';
import Headeradmin from '../components/Headeradmin';
import Footer from '../components/Footer';
import '../style/Adminpage.css';
import Userlist from '../components/Userlist';

function Adminbuyerpage() {

    //const [activeTab, setActiveTab] = useState('');

    const [location, setLocation] = useState('');
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState('');
  
    const locations = ['All Users', 'Customer', 'Seller', 'Delivery']; // Sample locations
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
        setIsError(false); // Remove error when a location is selected
      };

    const navigate = useNavigate();
    return (
      <div className='adminpage'>
              <Headeradmin search={search} setSearch={setSearch}/>
              <nav>
              <div class="menu">
                  <ul>
                  <li>
                      <a href="#" className='allusernav'>
                      <FontAwesomeIcon icon={faCartShopping} size='4x' />
                      <p className='namenavbar'>All User</p>
                      </a>
                  </li>
                  <li>
                      <a href="#" onClick={()=>navigate('/adminseller')}>
                      <FontAwesomeIcon icon={faStore} size='4x'/>
                        <p className='namenavbar'>Booth</p>
                      </a>
                  </li>
                  </ul>
              </div>
          </nav>

        <div className="admin-container">        
        <div className="dropdown-admin-wrapper">
          <select
            value={location}
            onChange={handleLocationChange}
            className="admin-dropdown">
            {/* <option value="">All User</option> */}
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {/* <button className="-admin-dropdown-submit-btn" onClick={handleSubmit}>
            sumbit
          </button> */}
        </div>
        </div>

         {/* <div className="toggle-navbar">
            <div className={`toggle-option ${activeTab === 'Mahasiswa' ? 'active' : ''}`} onClick={() => setActiveTab('Mahasiswa')}>
                Mahasiswa
            </div>
            <div className={`toggle-option ${activeTab === 'Dosen' ? 'active' : ''}`} onClick={() => setActiveTab('Dosen')}>
                Dosen
            </div>
        </div> */}

          <Userlist selectedLocation={location} search={search}/>
 
  <Footer/>
      </div>
    );
}
export default Adminbuyerpage;