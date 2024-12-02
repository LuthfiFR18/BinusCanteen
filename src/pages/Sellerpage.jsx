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
    const [img, setImg] = useState(imgDefault);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    
    
   

    useEffect(() => {
        dispatch(getMe());
        
    
        const savedImage = localStorage.getItem('savedImage');
        setImg(savedImage || imgDefault);
    
        
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


                if (boothData && boothData.booths && boothData.booths.id) {
                    const boothId = boothData.booths.id; // Mengakses ID booth dari boothData.booths
                    console.log("booth id : ", boothId);
                    const productsResponse = await axios.get(
                        `http://localhost:5000/booth/${boothId}/products`
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
    
        if (user && user.id) {
            loadBoothAndProducts();
        }
    }, [user?.id]);

    

    const handleNavigate = (path) =>{
        navigate(path);
    };

    const handleCloseStore = () => {
        setStoreClosed(true);
        setShowPopupStoreStatus(false);
    };

    const handlePopupStoreStatus = () => {
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

    // const getBoothIdByUser = async(userId)=>{
    //     try {
            
    //         const response = await axios.get(`http://localhost:5000/booth/${user.id}`);
    //         setBooth(response.data);
    //         console.log("booth ID : ", response.data);
    //     } catch (error) {
    //         console.error('Failed to get Booth Id:', error);
    //     }
    // }

    // const fetchProductsByBooth  = async (boothId) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/products/booth/${boothId}`);
    //         console.log("Booth ID:", boothId);
    //         console.log("Booth Name:", boothName);
    //         console.log('Fetched Products:', response.data);
    //         setProducts(response.data);
    //     } catch (error) {
    //         console.error('Failed to fetch products:', error);
    //     }
    // };

    
    

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
            </div>
            <div className={`header-images ${storeClosed ? 'store-closed' : ''}`}>
                <img src={img} alt="Dish"/>
                {/* <img src="https://via.placeholder.com/300" alt="Dish 2"/>
                <img src="https://via.placeholder.com/300" alt="Dish 3"/> */}
                <button className="edit-picture-btn" onClick={() => handleNavigate('/EditPictureSeller')}>Edit Picture</button>
            </div>

            <h2 className="list-menu-title">List Menu</h2>
            {/* <button className="close-store-btn" onClick={handlePopup}>Close your store</button> */}
            <button
                className="close-store-btn"
                onClick={handlePopupStoreStatus}
                style={{ backgroundColor: storeClosed ? '#FF9D00' : 'red' }}
            >
                {storeClosed ? 'Open your store' : 'Close your store'}
            </button>

            <div className="menu-list">
                {/* {menus.map((menu, index) => ( */}
                {menus.map((menu) => (
                    // <div key={index} className="menu-item">
                    
                    <div key={menu.id} className="menu-item">
                        {/* <img src={img} alt="Menu Item" className="menu-image"/> */}
                        <img 
                        src={menu.image || "nasigoreng.png"} 
                        alt="Menu Item" 
                        className={`menu-image ${menu.isOutOfStock ? 'out-of-stock' : ''} ${storeClosed ? 'store-closed' : ''}`}
                        style={{ opacity: menu.isOutOfStock ? 0.5 : storeClosed ? 0.5 : 1 }}
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
                                {/* <button onClick={() => navigate(/EditMenuSeller, { state: { menu } })}>Edit</button> */}
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

           

            <button className="add-menu-btn" onClick={() => handleNavigate('/AddListMenuSeller')}>+</button>
            
            

            {showPopupStoreStatus &&(
                // <div className="popup-overlay">
                //     <div className="popup">
                //         <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
                //         <p>{popupMessage}</p>
                //         <div className="popup-buttons">
                //         <button className="yes-btn" 
                //             style={{ backgroundColor: isOutOfStockAction ? 'red' : '#FF9D00' }}
                //             // onClick={confirmOutOfStock}
                //             onClick={() => {
                //                 confirmOutOfStock();
                //             }}
                //             >
                //             Yes
                //         </button>
                //         <button 
                //             className="no-btn" 
                //             style={{ backgroundColor: '#FF9D00' }} 
                //             onClick={() => setShowPopup(false)}
                //         >
                //             No
                //         </button>
                //     </div>
                // </div>

                <PopUp
                //message="Are you sure you want to close the store?"
                // onConfirm={handleCloseStore}
                message={popupMessage}
                onConfirm={isClosingStore ? handleCloseStore : handleOpenStore}
                onCancel={() => setShowPopupStoreStatus(false)}
                isClosingStore={isClosingStore}
                // onClose={() => setStoreClosed(true)}
                />
        /* </div> */
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