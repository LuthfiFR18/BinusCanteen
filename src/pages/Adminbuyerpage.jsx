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

    const [activeTab, setActiveTab] = useState('Mahasiswa');

    const navigate = useNavigate();
    return (
      <div className='adminpage'>
              <Headeradmin/>
              <nav>
              <div class="menu">
                  <ul>
                  <li>
                      <a href="#" className='buyernav'>
                      <FontAwesomeIcon icon={faCartShopping} size='4x' />
                      <p className='namenavbar'>Customer</p>
                      </a>
                  </li>
                  <li>
                      <a href="#" onClick={()=>navigate('/adminseller')}>
                      <FontAwesomeIcon icon={faStore} size='4x'/>
                        <p className='namenavbar'>Seller</p>
                      </a>
                  </li>
                  <li>
                      <a href="#" onClick={()=>navigate('/admindelivery')}>
                      <FontAwesomeIcon icon={faTruck} size='4x'/>
                      <p className='namenavbar'>Delivery</p>
                      </a>
                  </li>
                  </ul>
              </div>
          </nav>
         <div className="toggle-navbar">
            <div className={`toggle-option ${activeTab === 'Mahasiswa' ? 'active' : ''}`} onClick={() => setActiveTab('Mahasiswa')}>
                Mahasiswa
            </div>
            <div className={`toggle-option ${activeTab === 'Dosen' ? 'active' : ''}`} onClick={() => setActiveTab('Dosen')}>
                Dosen
            </div>
        </div>

          <Userlist/>
 
  
  <Footer/>
      </div>
    );
}
export default Adminbuyerpage;