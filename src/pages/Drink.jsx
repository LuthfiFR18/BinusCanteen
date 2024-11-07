import React, {useState} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Drink.css';
import Drinkmenu from '../components/Drinkmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

const ButtonStack = () => {
    const [activeButton, setActiveButton] = useState(2);
    const navigate = useNavigate();
  
    const handleClick = (buttonNumber, path) => {
      setActiveButton(buttonNumber);
      navigate(path);
    };
  
    return (
        <div className="selector-btn">
        <button
        className={`menu-button-meals ${activeButton === 1 ? 'active' : ''}`}
        onClick={() => handleClick(1, '/meals')}

        >
          Meals
        </button>
        <button
        className={`menu-button-drink drink-btn ${activeButton === 2 ? 'active' : ''}`}
        onClick={() => handleClick(2, '/drink')}
          
        >
          Drink
        </button>
        <button
        className={`menu-button-dessert ${activeButton === 3 ? 'active' : ''}`}
        onClick={() => handleClick(3, '/dessert')}
        
        >
          Dessert
        </button>
      </div>
    );
  };

const Drink = () => {

  return (
    <div className="drink-container">
    <div className='drinkpage'>
            <Header/>

        
            <h3 id='booth-name'>Nara Kitchen</h3>

            <ButtonStack/>
        
        <Drinkmenu/>
        <Drinkmenu/>
        <Drinkmenu/>
        <Drinkmenu/>
        <Drinkmenu/>
        </div>
        <Footer/>
    </div>
  )
}

export default Drink;