import React, { useState } from 'react'
import '../style/InProgress.css'
import HeaderDelivery from '../components/HeaderDelivery';
import InProgressDelivery from '../components/InProgressDelivery';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function InProgress() {
    const [activeTab, setActiveTab] = useState('In Progress');

    const navigate = useNavigate();

  return (
    <div className="inprogress-delivery-container">
        <HeaderDelivery/>

        <div className="toggle-navbar-delivery">
            <div className={`toggle-option-delivery ${activeTab === 'Avaliable' ? 'active' : ''}`} onClick={() => navigate('/deliverypage')}>
                Avaliable
            </div>
            <div className={`toggle-option-delivery ${activeTab === 'In Progress' ? 'active' : ''}`} onClick={() => setActiveTab('In Progress')}>
                In Progress
            </div>
        </div>
        {/* List Item to Order */}
        <InProgressDelivery/>
        <InProgressDelivery/>
        <InProgressDelivery/>
        <InProgressDelivery/>
        <InProgressDelivery/>
        <InProgressDelivery/>
        <InProgressDelivery/>

        
        <Footer/>
    </div>
  )
}

export default InProgress;