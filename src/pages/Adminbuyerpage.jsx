import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'
import Mealsmenu from '../components/Mealsmenu';
import Headeradmin from '../components/Headeradmin';
import Footer from '../components/Footer';
import '../style/Adminpage.css';
import Userlist from '../components/Userlist';

function Adminbuyerpage() {
    const navigate = useNavigate();
    return (
      <div className='adminpage'>
              <Headeradmin/>
              <nav>
              <div class="menu">
                  <ul>
                  <li>
                      <a href="#" className='buyernav'>
                      <FontAwesomeIcon icon={faUtensils} size='4x' />
                      <p className='namenavbar'>Buyer</p>
                      </a>
                  </li>
                  <li>
                      <a href="#" onClick={()=>navigate('/adminseller')}>
                      <FontAwesomeIcon icon={faGlassWater} size='4x' />
                      <p className='namenavbar'>Seller</p>
                      </a>
                  </li>
                  <li>
                      <a href="#" onClick={()=>navigate('/admindelivery')}>
                      <FontAwesomeIcon icon={faIceCream} size='4x'/>
                      <p className='namenavbar'>Delivery</p>
                      </a>
                  </li>
                  </ul>
              </div>
          </nav>
          <nav>
            <div className="filternav">
                <ul>
                    <li>
                        <a href="#" className='mhs-nav'>
                        <p className='mhs-text'>Mahasiswa</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <p className='dosen-text'>Dosen</p>
                        </a>
                    </li>
                </ul>
                </div>
              </nav>

          <Userlist/>
 
  
  <Footer/>
      </div>
    );
}
export default Adminbuyerpage;