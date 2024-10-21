import React, {useState} from 'react'
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

     // State untuk melacak tombol aktif
     const [activeButton, setActiveButton] = useState("Dessert");

     // Fungsi untuk mengubah tombol aktif saat diklik
     const handleButtonClick = (buttonName) => {
     setActiveButton(buttonName);
   };

  return (
    <div className='dessertpage'>
            <Header/>

            <h3 className='booth-name'>Nara Kitchen</h3>

        
        <div className="selector-btn">

            <button className="btn meals-btn" onClick={() => {
                handleButtonClick("Meals");
                navigate('/meals');
            }}>Meals
            </button>

            <button
                className="btn drink-btn" onClick={() => {
                    handleButtonClick("Drink");
                navigate('/drink')}}>Drink
            </button>

            <button
                className={`btn dessert-btn ${activeButton === "Dessert" ? "active" : ""}`}
                onClick={() => handleButtonClick("Dessert")}>
                Dessert
            </button>

            <div
                className={`active-bg ${activeButton === "Meals" ? "meals-active" : ""} ${
                activeButton === "Drink" ? "drink-active" : ""
                } ${activeButton === "Dessert" ? "dessert-active" : ""}`}
            ></div>
        </div>
            {/* <nav>
            <div class="menubar-dessert">
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
        </nav> */}
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