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

  // Function Dropdown
  const locations = ['Customer', 'Seller', 'Delivery']; 
  const handleLocationChange = (event) => {
      setLocation(event.target.value);
      setIsError(false);
    };

  const navigate = useNavigate();
  return (
    <div className="admin-container">
      <div className='adminpage'>
        <Headeradmin search={search} setSearch={setSearch}/>

        {/* Navbar */}
        <nav>
          <div class="menu-admin">
            <ul>
              <li>
                <a href="#" className='allusernav'>
                <FontAwesomeIcon icon={faCartShopping} size='4x' />
                <p className='namenavbar'>All Users</p>
                </a>
              </li>

              <li>
                <a href="#" onClick={()=>navigate('/adminseller')}>
                <FontAwesomeIcon icon={faStore} size='4x'/>
                  <p className='namenavbar'>Booth&Seller</p>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Button Dropdown */}
        <div className="admin-subcontainer">        
          <div className="dropdown-admin-wrapper">
            <select
              value={location}
              onChange={handleLocationChange}
              className="admin-dropdown">
              <option value="">All User</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div> 
        </div> 

        {/* Table */}
        <div className="userlist-container">
          <Userlist selectedLocation={location} search={search}/>
        </div>

      </div>

      <Footer/>
    </div>
  );
}
export default Adminbuyerpage;