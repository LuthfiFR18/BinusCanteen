import React, { useState, useEffect } from 'react';
import '../style/Sellerpage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMenuContext } from '../app/MenuContext';
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
    const [menus, setMenus] = useState([
        {id:1, name: 'Nasi Goreng', description: 'Nasi dengan bumbu khas', price:15000, itemType: 'Food', image: 'nasigoreng.png', isOutOfStock: false}
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const [storeClosed, setStoreClosed] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isOutOfStockAction, setIsOutOfStockAction] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
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

    const handleEditMenu = (menu) => {
        navigate(`/EditMenuSeller`, { state: { menu } });
    };

    const handleOutOfStockClick = (menuId, isOutOfStock) =>{
        setSelectedMenuId(menuId);
        setIsOutOfStockAction(!isOutOfStock);
        setPopupMessage(isOutOfStock ?
            "Are you sure this menu is back in stock?" :
            "Are you sure this menu is out of stock?");
        setShowPopup(true);
    };

    useEffect(() => {
        console.log("Updated menus:", menus);
    }, [menus]);

    const confirmOutOfStock = () => {
        if (selectedMenuId !== null) {
            setMenus((prevMenus) =>
                prevMenus.map(menu =>
                    menu.id === selectedMenuId
                        ? { ...menu, isOutOfStock: !menu.isOutOfStock }
                        : menu
                )
            );
            // const updatedMenus = menus.map(menu =>
                // menu.id === selectedMenuId ? { ...menu, isOutOfStock: isOutOfStockAction } : menu
            //     menu.id === selectedMenuId ? { ...menu, isOutOfStock: !menu.isOutOfStock } : menu
            // );
            // setMenus(updatedMenus);
            // setMenus(prevMenus =>
            //      prevMenus.map(menu =>
            //         menu.id === selectedMenuId ? { ...menu, isOutOfStock: isOutOfStockAction } : menu
            //     )
            // );
            // document.getElementById('outOfStockBtn-${menuId')
            // const updatedMenu = updatedMenu.find(menu => menu.id === selectedMenuId);
            // document.getElementById(`outOfStockBtn-${selectedMenuId}`).style.backgroundColor = updatedmenus.find(menu => menu.id === selectedMenuId).isOutOfStock ? '#FF9D00' : 'red';
        }
        setShowPopup(false);
    };

    // const menus = [
    //     {
    //         name : 'Nasi Goreng Special',
    //         price : 'Rp 20.000',
    //         description : 'Nasi goreng dengan topping telur dadar/mata sapi',
    //     },
    //     {
    //         name : 'Nasi Goreng Seafood',
    //         price : 'Rp 30.000',
    //         description : 'Nasi goreng dengan aneka seafood segar',
    //     },
    //     {
    //         name : 'Nasi Goreng Komplit',
    //         price : 'Rp 35.000',
    //         description : 'Nasi goreng dengan topping seafood dan telur dadar/mata sapi',
    //     }
    // ]
    

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
                        {/* <img src={img} alt="Menu Item" className="menu-image"/> */}
                        <img 
                            src={menu.image || "nasigoreng.png"} 
                            alt="Menu Item" 
                            className={`menu-image ${menu.isOutOfStock ? 'out-of-stock' : ''}`}
                            style={{ opacity: menu.isOutOfStock ? 0.5 : 1 }}
                        />
                        <div className="menu-details">
                            <div className="menu-info">
                                <h4>{menu.name}</h4>
                                <p>{menu.description}</p>
                                <p>Type: {menu.itemType}</p>
                            </div>
                            <div className="menu-info">
                                <h4>Harga</h4>
                                <p>{menu.price}</p>
                            </div>
                            <div className="menu-edit">
                                {/* <button onClick={() => handleNavigate('/EditMenuSeller')}>Edit</button> */}
                                <button onClick={() => handleEditMenu(menu)}>Edit</button>
                                <button 
                                    style={{ backgroundColor: menu.isOutOfStock ? '#FF9D00' : 'red' }} 
                                    onClick={() => handleOutOfStockClick(menu.id, menu.isOutOfStock)}
                                >
                                    {menu.isOutOfStock ? 'Back in Stock' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="add-menu-btn" onClick={() => handleNavigate('/AddListMenuSeller')}>+</button>
            
            {showPopup &&(
                <div className="popup-overlay">
                    <div className="popup">
                        <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
                        <p>{popupMessage}</p>
                        <div className="popup-buttons">
                        <button className="yes-btn" 
                            style={{ backgroundColor: isOutOfStockAction ? 'red' : '#FF9D00' }}
                            // onClick={confirmOutOfStock}
                            onClick={() => {
                                confirmOutOfStock();
                            }}
                            >
                            Yes
                        </button>
                        <button 
                            className="no-btn" 
                            style={{ backgroundColor: '#FF9D00' }} 
                            onClick={() => setShowPopup(false)}
                        >
                            No
                        </button>
                    </div>
                </div>

                <Popup
                //message="Are you sure you want to close the store?"
                // onConfirm={handleCloseStore}
                message={popupMessage}
                onConfirm={isClosingStore ? handleCloseStore : handleOpenStore}
                onCancel={() => setShowPopup(false)}
                isClosingStore={isClosingStore}
                // onClose={() => setStoreClosed(true)}
                />
        </div>
        )}

            <Footerseller/>
        </div>
    );
}

export default Sellerpage;