import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faStore, faTruck} from '@fortawesome/free-solid-svg-icons'
import Headeradmin from '../components/Headeradmin';
import Footer from '../components/Footer';
import '../style/Adminsellerpage.css'
import ProductList from '../components/productlist';


function Adminsellerpage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    return (
      <div className='sellerpage'>
              <Headeradmin search={search} setSearch={setSearch}/>
              <nav>
              <div class="menu">
                  <ul>
                  <li>
                      <a href="#" onClick={()=>navigate('/adminbuyer')}>
                      <FontAwesomeIcon icon={faCartShopping} size='4x' />
                      <p className='namenavbar'>All User</p>
                      </a>
                  </li>
                  <li>
                      <a href="#" className='boothnav'>
                      <FontAwesomeIcon icon={faStore} size='4x'/>
                        <p className='namenavbar'>Booth</p>
                      </a>
                  </li>
                  </ul>
              </div>
          </nav>

          <ProductList search={search} />



  <Footer/>
      </div>
    );
}
export default Adminsellerpage;