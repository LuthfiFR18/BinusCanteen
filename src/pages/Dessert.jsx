import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Dessert.css';
import Dessertmenu from '../components/Dessertmenu';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

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
                    <a href="#" className='dessertnav'>
                    <FontAwesomeIcon icon={faIceCream} size='4x'/>
                    <p className='namenavbar'>Dessert</p>
                    </a>
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