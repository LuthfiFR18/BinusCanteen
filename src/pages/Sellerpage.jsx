import { faGlassWater, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Footerseller from '../components/Footerseller';
import Header from '../components/Headerseller';
import PopUp from '../components/PopUpCloseSellerStore';
import PopUpDeleteMenuSeller from '../components/PopUpDeleteMenuSeller';
import PopUpOutOfStock from '../components/PopUpOutOfStock';
import { getMe } from '../features/authSlice';
import imgDefault from '../img/nasigoreng.png';
import '../style/Sellerpage.css';



function Sellerpage() {
    const navigate = useNavigate();
    const [ menus, setMenus ] = useState([]);
    const [showPopupStoreStatus, setShowPopupStoreStatus] = useState(false);
    const [showPopupOutOfStock, setShowPopupOutOfStock] = useState(false);
    const [showPopupDeleteMenu, setShowPopupDeleteMenu] = useState(false);
    const [storeClosed, setStoreClosed] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupMessageStock, setPopupMessageStock] = useState('');
    const [isOutOfStockAction, setIsOutOfStockAction] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [isClosingStore, setIsClosingStore] = useState(false);
    const [img, setImg] = useState();
    const [profileImage, setProfileImage] = useState('');
    const [boothName, setBoothName] = useState();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [userData, setUserData] = useState();
    
    
   

    useEffect(() => {
        dispatch(getMe());
        
    
        const savedImage = localStorage.getItem('savedImage');
        setImg(savedImage || imgDefault);
    
        if (user && user.id) {
            loadBoothAndProducts();
        }
    }, [user?.id]);

    const loadBoothAndProducts = async () => {
            if (!user || !user.id) {
                console.error("User data is missing.");
                return;
            }
    
            try {
                // Ambil Booth berdasarkan user.id
                const boothResponse = await axios.get(`http://localhost:5000/booth/${user.id}`);
                const boothData = boothResponse.data;
                console.log("boothData: ", boothData);

                // Mengambil gambar dan nama dari booth
                    
                    
                const NamaBooth = boothData.booths.name;
                    setBoothName(NamaBooth);

                const boothImage = boothData.booths.image;
                    setProfileImage(boothImage);
                


                if (boothData && boothData.booths && boothData.booths.id) {
                    const boothId = boothData.booths.id; // Mengakses ID booth dari boothData.booths
                    
                    

                    const productsResponse = await axios.get(`http://localhost:5000/booth/${boothId}/products`
                    );
                    setMenus(productsResponse.data); // Set data Produk ke state
                    console.log("Produk dari Booth:", productsResponse.data);
                } else {
                    console.warn("Booth not found for user:", user.id);
                }
                
            } catch (error) {
                console.error("Error loading Booth and Products:", error.message);
            }
        };

    

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
        navigate(`/EditMenuSeller`, { state: { menu } });
    };

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
        if (menuId) {
            setSelectedMenuId(menuId);
            setShowPopupDeleteMenu(true);
        } else {
            console.error("Menu ID is not valid:", menuId);
        }
    };

    const confirmDeleteMenu = async () => {
        if (!selectedMenuId) {
            console.error("No selected menu to delete");
            return;
        }
    
        try {
            const url = `http://localhost:5000/product/${selectedMenuId}`;
            console.log("Deleting product at:", url);
            const response = await axios.delete(url);
            console.log("Product deleted:", response.data);
    
            // Optionally refresh the menu list after deletion
            loadBoothAndProducts();
    
            setShowPopupDeleteMenu(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    

    return(
        <div className='dashboard'>
            
                <Header/>

                <div className="header-seller">
                
                    <div className={`header-images ${storeClosed ? 'store-closed' : ''}`}>
                        <img src={`http://localhost:5000/uploads/${profileImage}`} alt="Error"/>
                        
                    </div>

                    <div className="header-content">    
                        <h1 className="welcome-text">Welcome, {boothName}</h1>
                        <div className="button-group">
                            <button className="edit-picture-btn" onClick={() => handleNavigate('/EditPictureSeller')}>Edit Picture</button>    
                            <button
                                className="close-store-btn"
                                onClick={handlePopupStoreStatus}
                                style={{ backgroundColor: storeClosed ? '#FF9D00' : 'red' }}
                            >
                                {storeClosed ? 'Open your store' : 'Close your store'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <nav className='navmenu'>
                    <div class="menu">
                        <ul>
                            <li>
                                <a href="#" onClick={()=>navigate('/ListMenuSeller')}>
                                <FontAwesomeIcon icon={faUtensils} size='4x' />
                                <p className='namenavbar'>List Menu</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate('/OrderListSeller')}>
                                <FontAwesomeIcon icon={faGlassWater} size='4x' />
                                <p className='namenavbar'>Order List</p>

                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>


            <h2 className="list-menu-title">List Menu</h2>
            {/* <button className="close-store-btn" onClick={handlePopup}>Close your store</button> */}
            {/* <button
                className="close-store-btn"
                onClick={handlePopupStoreStatus}
                style={{ backgroundColor: storeClosed ? '#FF9D00' : 'red' }}
            >
                {storeClosed ? 'Open your store' : 'Close your store'}
            </button> */}
            <h2 className="list-menu-title">List Menu Nasi Goreng Nara</h2>
            

            <div className="menu-list">

                {menus.map((menu) => (
                    
                    <div key={menu.id} className="menu-item">
                        
                        <img 
                        src={menu.image || "nasigoreng.png"} 
                        alt="Menu Item" 
                        className={`menu-image ${menu.isOutOfStock ? 'out-of-stock' : ''} ${storeClosed ? 'store-closed' : ''}`}
                        style={{ opacity: menu.isOutOfStock ? 0.5 : storeClosed ? 0.5 : 1 }}
                    />
                    
                        <div className="menu-details">
                            <div className="menu-info">
                                <h4>{menu.name}</h4>
                                
                                <p>Type: {menu.producttype}</p>
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
                                    onClick={() => handleDeleteMenu(menu.uuid)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

           

            <button className="add-menu-btn" onClick={() => handleNavigate('/AddListMenuSeller')}>+</button>
            
            

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

export default Sellerpage;