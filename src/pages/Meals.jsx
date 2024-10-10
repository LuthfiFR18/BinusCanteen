import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Meals.css';
import Mealsmenu from '../components/Mealsmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

function Meals() {
    
    const navigate = useNavigate();

  return (
    <div className='Mealspage'>
            <Header/>
            <nav>
            <div class="menubar-meals">
                <ul>
                <li>
                    <a href="#" className='mealsnav'>
                    <FontAwesomeIcon icon={faUtensils} size='4x' />
                    <p className='namenavbar'>Meals</p>
                    </a>
                </li>
                <li>
                    <a href="#" onClick={()=>navigate('/drink')}>
                    <FontAwesomeIcon icon={faGlassWater} size='4x' />
                    <p className='namenavbar'>Drink</p>
                    </a>
                </li>
                <li>
                    <a href="#" onClick={()=>navigate('/dessert')}>
                    <FontAwesomeIcon icon={faIceCream} size='4x'/>
                    <p className='namenavbar'>Dessert</p>
                    </a>
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