import React from 'react';
import '../style/Dashboard.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../img/nasigoreng.png';
import Boothgrid from '../components/Boothgrid';
import Carouselbestoffer from '../components/Carouselbestoffer';
import Carouselforyou from '../components/Carouselforyou';
import Carouseltodayoffer from '../components/Carouseltodayoffer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater, faIceCream, } from '@fortawesome/free-solid-svg-icons'

function Dashboard(){
    const navigate = useNavigate();

    return(
            <div className="dashboard-container">
                <Header/>

                <h4>Welcome, User</h4>

                <Boothgrid/>
                <Boothgrid/>
                <Boothgrid/>
                <Boothgrid/>
            {/* <div className="canteen-list">
                <div className="canteen-container">
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>

                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                </div>
            </div> */}
                {/* <nav className='navmenu'>
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
            <Carouseltodayoffer/>*/}
            <Footer/>
            </div>
    );
}

export default Dashboard;