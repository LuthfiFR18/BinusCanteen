import React from 'react';
import '../style/Dashboard.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carouselbestoffer from '../components/Carouselbestoffer';
import Carouselforyou from '../components/Carouselforyou';
import Carouseltodayoffer from '../components/Carouseltodayoffer';
import img1 from '../img/nasigoreng.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

function Dashboard(){
    const navigate = useNavigate();

    return(
        <div className='dashboard'>
            <div class="navbar1">
                <Header/>
                <nav className='navmenu'>
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
                                <a href="#" onClick={()=>navigate('/dessert')}>
                                <FontAwesomeIcon icon={faIceCream} size='4x'/>
                                <p className='namenavbar'>Dessert</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <Carouselbestoffer/>
            <Carouselforyou/>
            <Carouseltodayoffer/>

            <Footer/>
        </div>
    );
}

export default Dashboard;