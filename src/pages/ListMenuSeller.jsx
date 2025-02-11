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
import PopUp from '../components/PopUpCloseSellerStore';
import PopUpOutOfStock from '../components/PopUpOutOfStock';
import PopUpDeleteMenuSeller from '../components/PopUpDeleteMenuSeller';
import imgDefault from '../img/nasigoreng.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUtensils,faGlassWater} from '@fortawesome/free-solid-svg-icons'
import EditMenuSeller from './EditMenuSeller';

function ListMenuSeller() {
    const navigate = useNavigate();
    const { menus, setMenus } = useMenuContext();
    const [showPopupStoreStatus, setShowPopupStoreStatus] = useState(false);
    const [showPopupOutOfStock, setShowPopupOutOfStock] = useState(false);
    const [showPopupDeleteMenu, setShowPopupDeleteMenu] = useState(false);
    const [storeClosed, setStoreClosed] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupMessageStock, setPopupMessageStock] = useState('');
    const [isOutOfStockAction, setIsOutOfStockAction] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [isClosingStore, setIsClosingStore] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
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
        setShowPopupStoreStatus(false);
    };

    const handlePopupStoreStatus = () => {
        const message = storeClosed 
            ? 'Are you sure want to open your store?' 
            : 'Are you sure want to close your store?';
        
        setPopupMessage(message);
        setIsClosingStore(!storeClosed);
        setShowPopupStoreStatus(true);
    };

    const handleOpenStore = () =>{
        setStoreClosed(false);
        setShowPopupStoreStatus(false);
    }

    const handleSaveImage = (newImage) => {
        setImg(newImage);
        localStorage.setItem('savedImage', newImage);
    }

    const handleEditMenu = (menu) => {
        // navigate(`/EditMenuSeller`, { state: { menu } });
        setSelectedMenu(menu);
        setIsEditPopupOpen(true);
    };

    const handleCloseEditPopup = () => {
        setIsEditPopupOpen(false);
        setSelectedMenu(null);
    }

    const handleOutOfStockClick = (menuId, isOutOfStock) =>{
        setSelectedMenuId(menuId);
        setIsOutOfStockAction(!isOutOfStock);
        setPopupMessageStock(isOutOfStock ?
            "Are you sure this menu is back in stock?" :
            "Are you sure this menu is out of stock?");
        setShowPopupOutOfStock(true);
    };

    useEffect(() => {
        console.log("Updated menus in Sellerpage:", menus);
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
            
        }
        setShowPopupOutOfStock(false);
    };

    const handleDeleteMenu = (menuId) => {
        setSelectedMenuId(menuId);
        setShowPopupDeleteMenu(true);
    };

    const confirmDeleteMenu = () => {
        setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== selectedMenuId));
        setShowPopupDeleteMenu(false);
    };

    return(
        <div className='dashboard'>
            <div class="navbar1">
                <Header/>
            </div>
            <button className="list-menu-seller-back-button" onClick={() => navigate('/Sellerpage')}>
                <span className="arrow-left">&#8592;</span>
            </button>
            <h2 className="list-menu-title">List Menu Nasi Goreng Nara</h2>
            
            <div className="menu-list">
                {menus.map((menu) => (
                    <div key={menu.id} className="list-menu-item">
                        <img 
                            src={menu.image || "nasigoreng.png"} 
                            alt="Menu Item" 
                            className={`menu-image ${menu.isOutOfStock ? 'out-of-stock' : ''} ${storeClosed ? 'store-closed' : ''}`}
                            style={{ opacity: menu.isOutOfStock ? 0.5 : storeClosed ? 0.5 : 1 }}
                        />
                        <div className="menu-details">
                            <div className="menu-info">
                                <h4>{menu.name}</h4>
                                <p>Type: {menu.itemType}</p>
                            </div>
                            <div className="menu-info">
                                <h4>Harga</h4>
                                <p>{menu.price}</p>
                            </div>
                            <div className="menu-edit">
                                
                                <button onClick={() => handleEditMenu(menu)}>Edit</button>
                                
                                <button 
                                    style={{ backgroundColor: menu.isOutOfStock ? '#FF9D00' : 'red' }} 
                                    onClick={() => handleOutOfStockClick(menu.id, menu.isOutOfStock)}
                                >
                                    {menu.isOutOfStock ? 'Back in Stock' : 'Out of Stock'}
                                </button>
                                <button 
                                    className="delete-btn"
                                    style={{ backgroundColor: 'black', color: 'white' }}
                                    onClick={() => handleDeleteMenu(menu.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isEditPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <EditMenuSeller
                            menu={selectedMenu}
                            onClose={handleCloseEditPopup}
                        />
                    </div>
                </div>
            )}

            {showPopupStoreStatus &&(
                
                <PopUp
                message={popupMessage}
                onConfirm={isClosingStore ? handleCloseStore : handleOpenStore}
                onCancel={() => setShowPopupStoreStatus(false)}
                isClosingStore={isClosingStore}
                />
            )}

            {showPopupOutOfStock &&(
                <PopUpOutOfStock
                message={popupMessageStock}
                onConfirm={confirmOutOfStock}
                onCancel={() => setShowPopupOutOfStock(false)}
                isOutOfStock={isOutOfStockAction}
                />
            )}

            {showPopupDeleteMenu &&(
                <PopUpDeleteMenuSeller
                    message="Are you sure you want to delete this menu permanently? There's no way to recover a deleted menu."
                    onClose={() => setShowPopupDeleteMenu(false)}
                    onConfirm={confirmDeleteMenu}
                />
            )}

            <Footerseller/>
        </div>
    );
}

export default ListMenuSeller;