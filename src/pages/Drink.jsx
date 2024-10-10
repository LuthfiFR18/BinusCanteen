import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Drink.css';
import Drinkmenu from '../components/Drinkmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

function Drink() {
    const navigate = useNavigate();

  return (
    <div className='drinkpage'>
            <Header/>
            <nav>
            <div class="menubar-drink">
                <ul>
                <li>
                    <a href="#" onClick={()=>navigate('/meals')}>
                    <FontAwesomeIcon icon={faUtensils} size='4x' />
                    <p className='namenavbar'>Meals</p>
                    </a>
                </li>
                <li>
                    <a href="#" className='drinknav'>
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