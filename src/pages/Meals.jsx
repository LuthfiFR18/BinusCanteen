import React, {useState, useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Meals.css';
import Mealsmenu from '../components/Mealsmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

const ButtonStack = () => {
    const [activeButton, setActiveButton] = useState(1);
    const navigate = useNavigate();
  
    const handleClick = (buttonNumber, path) => {
      setActiveButton(buttonNumber);
      navigate(path);
    };
  
    return (
      <div className="selector-btn">
        <button
        className={`menu-button-meals meals-btn ${activeButton === 1 ? 'active' : 'menu-button-meals'}`}
        onClick={() => handleClick(1, '/meals')}

        >Meals
        </button>
        <button
        className={`menu-button-drink ${activeButton === 2 ? 'active' : 'menu-button-drink'}`}
        onClick={() => handleClick(2, '/drink')}
          
        >Drink
        </button>
        <button
        className={`menu-button-dessert ${activeButton === 3 ? 'active' : 'menu-button-dessert'}`}
        onClick={() => handleClick(3, '/dessert')}
        
        >Dessert
        </button>
      </div>
    );
  };

  const Meals = () => {
    
  return (
    <div className="meals-container">
      <div className='Mealspage'>
        <Header/>
    
        <h3 id='booth-name'>Nara Kitchen</h3>

        <ButtonStack />
                    
        <Mealsmenu/>
        
    </div>
    <Footer/>

    </div>
  )
}

export default Meals;