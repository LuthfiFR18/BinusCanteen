import React, { useState } from 'react'
import '../style/InProgressDelivery.css';
import HeaderDelivery from '../components/HeaderDelivery';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function InProgressDelivery() {
    const [activeTab, setActiveTab] = useState('In Progress');

    const navigate = useNavigate();

  return (
    <div className="inprogress-delivery-container">
        <HeaderDelivery/>

        <div className="toggle-navbar-delivery-inprogress">
            <div className={`toggle-option-delivery-inprogress ${activeTab === 'Avaliable' ? 'active' : ''}`} onClick={() => navigate('/deliverypage')}>
                Avaliable
            </div>
            <div className={`toggle-option-delivery-inprogress ${activeTab === 'In Progress' ? 'active' : ''}`} onClick={() => setActiveTab('In Progress')}>
                In Progress
            </div>
        </div>
        <div className="menu-name">
            <ul>
                <li>Date&Time</li>
                <li>No Pemesanan</li>
                <li>Item</li>
                <li>Item Description</li>
                <li>Location</li>
            </ul>

        <div className="delivery-send-list">

        </div>

        </div>

        <Footer/>
    </div>
  )
}

export default InProgressDelivery;