import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faStore, faTruck} from '@fortawesome/free-solid-svg-icons'
import Headeradmin from '../components/Headeradmin';
import Footer from '../components/Footer';
import '../style/Adminsellerpage.css'
import SellerNameTableBooth from '../components/SellerNameTableBooth';
import ProductList from '../components/ProductList';


function Adminsellerpage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [isError, setIsError] = useState(false);


    const locations = ['Customer', 'Seller', 'Delivery']; 
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
      setIsError(false);
    };

    return (
        <div className="admin-container">
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

                <div className="admin-booth-subcontainer">        
                    <div className="dropdown-admin-booth-wrapper">
                        <select
                            value={location}
                            onChange={handleLocationChange}
                            className="admin-dropdown-booth">
                            <option value="">All User</option>
                            {locations.map((loc, index) => (
                                <option key={index} value={loc}>
                                {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <ProductList search={search} />

            </div>

            <Footer/>
      </div>
    );
}
export default Adminsellerpage;