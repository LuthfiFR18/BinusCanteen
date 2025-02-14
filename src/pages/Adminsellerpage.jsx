import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping, faStore, faReceipt} from '@fortawesome/free-solid-svg-icons'
import Headeradmin from '../components/Headeradmin';
import Footer from '../components/Footer';
import '../style/Adminsellerpage.css'
import SellerNameTableBooth from '../components/SellerNameTableBooth';
import ProductList from '../components/ProductList';
import axios from 'axios';


function Adminsellerpage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedBooth, setSelectedBooth] = useState('');
    const [isError, setIsError] = useState(false);

    const [booth, setBooths] = useState([]);

    const getBooths = async () => {
        try {
          const response = await axios.get('http://localhost:5000/booth'); // Mengambil daftar booth dari backend
          setBooths(response.data); // Simpan daftar booth ke state booths
        } catch (error) {
          console.error('Error fetching booths:', error);
        }
      };

    useEffect(()=>{

        getBooths();
    },[]);
    

    //const locations = ['Customer', 'Seller', 'Delivery']; 
    const handleLocationChange = (e) => {
      setSelectedBooth(e.target.value);
      setIsError(false);
};

    return (
        // Page
        <div className="admin-container">
            <div className='sellerpage'>
                <Headeradmin search={search} setSearch={setSearch}/>
                
                <nav className='menu-admin'>
                    <ul>
                        <li>
                            <a href="#" onClick={()=>navigate('/adminbuyer')}>
                            <FontAwesomeIcon icon={faCartShopping} size='4x' />
                            <p className='namenavbar'>All User</p>
                            </a>
                        </li>

                        <li>
                            <a href="#" className='activenav'>
                            <FontAwesomeIcon icon={faStore} size='4x'/>
                            <p className='namenavbar'>Booth&Seller</p>
                            </a>
                        </li>

                        <li>
                            <a href="#" onClick={()=>navigate('/admintranscation')}>
                            <FontAwesomeIcon icon={faReceipt} size='4x' />
                            <p className='namenavbar'>Transaction</p>
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Button Dropdown  */}
                <div className="admin-booth-subcontainer">        
                    <div className="dropdown-admin-booth-wrapper">
                        <select
                            value={selectedBooth}
                            onChange={handleLocationChange}
                            className="admin-dropdown-booth">

                            <option value="">All Booth</option>
                            {booth.map((booth) => (
                                <option key={booth.uuid} value={booth.name}>
                                {booth.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <ProductList search={search} selectedBooth={selectedBooth} />

            </div>

            <Footer/>
      </div>
    );
}
export default Adminsellerpage;