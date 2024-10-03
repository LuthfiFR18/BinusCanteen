import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'
import Mealsmenu from '../components/Mealsmenu';
import Headeradmin from '../components/Headeradmin';
import Footer from '../components/Footer';
import '../style/Adminsellerpage.css';
function Adminsellerpage() {
    const navigate = useNavigate();

    return (
      <div className='sellerpage'>
              <Headeradmin/>
              <nav>
              <div class="menu">
                  <ul>
                  <li>
                      <a href="#" onClick={()=>navigate('/adminbuyer')}>
                      <FontAwesomeIcon icon={faUtensils} size='4x' />
                      <p className='namenavbar'>Buyer</p>
                      </a>
                  </li>
                  <li>
                      <a href="#" className='sellernav'>
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

  <Footer/>
      </div>
    );
}
export default Adminsellerpage;