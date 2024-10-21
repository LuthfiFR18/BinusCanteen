import React, { useState, useEffect } from 'react';
import '../style/Sellerpage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Headerseller';
import Footerseller from '../components/Footerseller';
import Carouselbestoffer from '../components/Carouselbestoffer';
import Carouselforyou from '../components/Carouselforyou';
import Carouseltodayoffer from '../components/Carouseltodayoffer';
import Popup from '../components/PopUpCloseSellerStore';
import imgDefault from '../img/nasigoreng.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater} from '@fortawesome/free-solid-svg-icons'

function Sellerpage() {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [storeClosed, setStoreClosed] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isClosingStore, setIsClosingStore] = useState(false);
    const [img, setImg] = useState(imgDefault);

    useEffect(() => {
        const savedImage = localStorage.getItem('savedImage');
        if(savedImage){
            setImg(savedImage);
        } else{
            setImg(imgDefault);
        }
    }, []);

    const handleNavigate = (path) =>{
        navigate(path);
    };

    const handleCloseStore = () => {
        setStoreClosed(true);
        setShowPopup(false);
    };

    const handlePopup = () => {
        // setPopupMassage(storeClosed ? 'Are you sure want to open your store?' : 'Are you sure want to close your store?');
        // setIsClosingStore(!storeClosed);
        // setShowPopup(true);
        // if (storeClosed) {
        //     setPopupMassage('Are you sure want to open your store?');
        // } else{
        //     setPopupMassage('Are you sure want to close your store?');
        // }
        const message = storeClosed 
            ? 'Are you sure want to open your store?' 
            : 'Are you sure want to close your store?';
        
        setPopupMessage(message);
        setIsClosingStore(!storeClosed);
        setShowPopup(true);
    };

    const handleOpenStore = () =>{
        setStoreClosed(false);
        setShowPopup(false);
    }

    const handleSaveImage = (newImage) => {
        setImg(newImage);
        localStorage.setItem('savedImage', newImage);
    }

    const menus = [
        {
            name : 'Nasi Goreng Special',
            price : 'Rp 20.000',
            description : 'Nasi goreng dengan topping telur dadar/mata sapi',
        },
        {
            name : 'Nasi Goreng Seafood',
            price : 'Rp 30.000',
            description : 'Nasi goreng dengan aneka seafood segar',
        },
        {
            name : 'Nasi Goreng Komplit',
            price : 'Rp 35.000',
            description : 'Nasi goreng dengan topping seafood dan telur dadar/mata sapi',
        }
    ]
    

    return(
        <div className='dashboard'>
            <div class="navbar1">
                <Header/>
                
                <nav className='navmenu'>
                    <div class="menu">
                        <ul>
                            <li>
                                <a href="#" onClick={()=>navigate('/ListMenu')}>
                                <FontAwesomeIcon icon={faUtensils} size='4x' />
                                <p className='namenavbar'>List Menu</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate('/OrderList')}>
                                <FontAwesomeIcon icon={faGlassWater} size='4x' />
                                <p className='namenavbar'>Order List</p>

                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={`header-images ${storeClosed ? 'store-closed' : ''}`}>
                <img src={img} alt="Dish"/>
                {/* <img src="https://via.placeholder.com/300" alt="Dish 2"/>
                <img src="https://via.placeholder.com/300" alt="Dish 3"/> */}
                <button className="edit-picture-btn" onClick={() => handleNavigate('/EditPictureSeller')}>Edit Picture</button>
            </div>

            <h2 className="list-menu-title">List Menu Nasi Goreng Nara</h2>
            {/* <button className="close-store-btn" onClick={handlePopup}>Close your store</button> */}
            <button
                className="close-store-btn"
                onClick={handlePopup}
                style={{ backgroundColor: storeClosed ? '#FF9D00' : 'red' }}
            >
                {storeClosed ? 'Open your store' : 'Close your store'}
            </button>
            
            <div className="menu-list">
                {menus.map((menu, index) => (
                    <div key={index} className="menu-item">
                        <img src={img} alt="Menu Item" className="menu-image"/>
                        <div className="menu-details">
                            <div className="menu-info">
                                <h4>{menu.name}</h4>
                                <p>{menu.description}</p>
                            </div>
                            <div className="menu-info">
                                <h4>Harga</h4>
                                <p>{menu.price}</p>
                            </div>
                            <div className="menu-edit">
                                <button onClick={() => handleNavigate('/EditMenuSeller')}>Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="add-menu-btn" onClick={() => handleNavigate('/AddListMenuSeller')}>+</button>
            
            {showPopup &&(
                <Popup
                //message="Are you sure you want to close the store?"
                // onConfirm={handleCloseStore}
                message={popupMessage}
                onConfirm={isClosingStore ? handleCloseStore : handleOpenStore}
                onCancel={() => setShowPopup(false)}
                isClosingStore={isClosingStore}
                // onClose={() => setStoreClosed(true)}
                />
            )} 
{/*             
            <Carouselbestoffer/>
            <Carouselforyou/>
            <Carouseltodayoffer/> */}
            <Footerseller/>
        </div>
    );
}

export default Sellerpage;