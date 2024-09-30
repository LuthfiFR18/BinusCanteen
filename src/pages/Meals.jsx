import React from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../style/Meals.css';
import Mealsmenu from '../Components/Mealsmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Meals() {
    
    const navigate = useNavigate();

  return (
    <div className='Mealspage'>
            <Header/>
            <nav>
            <div class="menu">
                <ul>
                    <li>
                    <a href="#" className='mealsnav'>
                    <i class="ri-restaurant-line"></i>Meals</a>
                    </li>
                    <li>
                        <a href="#" onClick={()=>navigate('/drink')}>
                        <i class="ri-drinks-fill"></i>Drink</a>
                    </li>
                    <li>
                        <a href="#" onClick={()=>navigate('/dessert')}>
                        <i class="ri-cake-3-fill"></i>Dessert</a>
                    </li>
                </ul>
            </div>
        </nav>
<Mealsmenu/>
<Mealsmenu/>
<Mealsmenu/>
<Mealsmenu/>

<Footer/>
    </div>
  )
}

export default Meals;