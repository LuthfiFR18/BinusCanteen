import React, {useState} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Dessert.css';
import Dessertmenu from '../components/Dessertmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

const ButtonStack = () => {
    const [activeButton, setActiveButton] = useState(3);
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


const Dessert = () => {

  return (
    <div className='dessertpage'>
            <Header/>

            <h3 className='booth-name'>Nara Kitchen</h3>

            <ButtonStack />

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