import React, {useState} from 'react'
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

     // State untuk melacak tombol aktif
     const [activeButton, setActiveButton] = useState("Drink");

     // Fungsi untuk mengubah tombol aktif saat diklik
     const handleButtonClick = (buttonName) => {
     setActiveButton(buttonName);
   };

  return (
    <div className='drinkpage'>
            <Header/>

        
            <h3 className='booth-name'>Nara Kitchen</h3>

        
        <div className="selector-btn">

            <button
                className={`btn meals-btn ${activeButton === "Meals" ? "active" : ""}`}
                onClick={() => {
                    handleButtonClick("Meals");
                    navigate('/meals');
                }}>Meals
            </button>

            <button
                className={`btn drink-btn ${activeButton === "Drink" ? "active" : ""}`}
                onClick={() => handleButtonClick("Drink")}>Drink
            </button>

            <button
                className={`btn dessert-btn ${
                activeButton === "Dessert" ? "active" : ""}`}
                onClick={() => {
                    handleButtonClick("Dessert");
                    navigate('/dessert');
                }}>
                Dessert
            </button>

            <div
                className={`active-bg ${activeButton === "Meals" ? "meals-active" : ""} ${
                activeButton === "Drink" ? "drink-active" : ""
                } ${activeButton === "Dessert" ? "dessert-active" : ""}`}
            ></div>
        </div>
            {/* <nav>
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
        </nav> */}
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