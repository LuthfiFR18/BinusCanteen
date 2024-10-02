import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Drink.css';
import Drinkmenu from '../components/Drinkmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Drink() {
    const navigate = useNavigate();

  return (
    <div className='drinkpage'>
            <Header/>
            <nav>
            <div class="menu">
                <ul>
                    <li>
                    <a href="#"onClick={()=>navigate('/meals')}>
                    <i class="ri-restaurant-line"></i>Meals</a>
                    </li>
                    <li>
                        <a href="#" className='drinknav'>
                        <i class="ri-drinks-fill"></i>Drink</a>
                    </li>
                    <li>
                        <a href="#"onClick={()=>navigate('/dessert')}>
                        <i class="ri-cake-3-fill"></i>Dessert</a>
                    </li>
                </ul>
            </div>
        </nav>
        <Drinkmenu/>
        <Drinkmenu/>
        <Drinkmenu/>
        <Drinkmenu/>
        <Drinkmenu/>

        <Footer/>
    </div>
  )
}

export default Drink;