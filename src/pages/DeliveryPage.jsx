import React, { useState } from 'react'
import HeaderDelivery from '../components/HeaderDelivery'
import Footer from '../components/Footer';
import '../style/DeliveryPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter} from '@fortawesome/free-solid-svg-icons'
import AvaliableDelivery from '../components/AvaliableDelivery';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function DeliveryPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Avaliable');

  return (
    <div className="dashboard-delivery">
        <HeaderDelivery/>

        <div className="toggle-navbar-delivery">
            <div className={`toggle-option-delivery ${activeTab === 'Avaliable' ? 'active' : ''}`} onClick={() => setActiveTab('Avaliable')}>
                Avaliable
            </div>
            <div className={`toggle-option-delivery ${activeTab === 'In Progress' ? 'active' : ''}`} onClick={() => navigate('/inprogress')}>
                Drink
            </div>
            <div className={`toggle-option-delivery ${activeTab === 'Booth' ? 'active' : ''}`} onClick={() => setActiveTab('Booth')}>
                Dessert
            </div>
        </div>
        
        <a href="" className="filter-box">
        <FontAwesomeIcon icon={faFilter} className='filter-icon' />
        </a>
        
        <div className="time-date-delivery">
        <p className="delivery-date">08:50 - Senin, 17/08/45</p>
        
        <AvaliableDelivery/>
        <AvaliableDelivery/>
        <AvaliableDelivery/>
        </div>

        <div className="time-date-delivery">
        <p className="delivery-date">08:50 - Senin, 17/08/45</p>
        
        <AvaliableDelivery/>
        <AvaliableDelivery/>
        <AvaliableDelivery/>
        </div>

        
        <Footer/>
    </div>
  )
};

export default DeliveryPage;
