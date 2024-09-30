import React from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../style/Dessert.css';
import Dessertmenu from '../Components/Dessertmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Dessert() {
    const navigate = useNavigate();

  return (
    <div className='dessertpage'>
            <Header/>
            <nav>
            <div class="menu">
                <ul>
                    <li>
                    <a href="#" onClick={()=>navigate('/meals')}>
                    <i class="ri-restaurant-line"></i>Meals</a>
                    </li>
                    <li>
                        <a href="#" onClick={()=>navigate('/drink')}>
                        <i class="ri-drinks-fill"></i>Drink</a>
                    </li>
                    <li>
                        <a href="#" className='dessertnav'>
                        <i class="ri-cake-3-fill"></i>Dessert</a>
                    </li>
                </ul>
            </div>
        </nav>
        <Dessertmenu/>
        <Dessertmenu/>
        <Dessertmenu/>
        <Dessertmenu/>
        <Dessertmenu/>
        <Dessertmenu/>

        <Footer/>
    </div>
  )
}

export default Dessert;