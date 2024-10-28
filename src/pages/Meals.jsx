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
        className={`menu-button meals-btn ${activeButton === 1 ? 'active' : 'menu-button'}`}
        onClick={() => handleClick(1, '/meals')}

        >
          Meals
        </button>
        <button
        className={`menu-button meals-btn ${activeButton === 2 ? 'active' : 'menu-button'}`}
        onClick={() => handleClick(2, '/drink')}
          
        >
          Drink
        </button>
        <button
        className={`menu-button meals-btn ${activeButton === 3 ? 'active' : ''}`}
        onClick={() => handleClick(3, '/dessert')}
        
        >
          Dessert
        </button>
      </div>
    );
  };

  const Meals = () => {
    
  return (
    <div className='Mealspage'>
            <Header/>
        
            <h3 className='booth-name'>Nara Kitchen</h3>

            <ButtonStack />
                    
        <Mealsmenu/>
        <Mealsmenu/>
        <Mealsmenu/>
        <Mealsmenu/>
        <Mealsmenu/>

        <Footer/>

    </div>
  )
}

export default Meals;