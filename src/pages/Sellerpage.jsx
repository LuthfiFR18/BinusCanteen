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
import EditMenuSeller from './EditMenuSeller';
import { getMe } from '../features/authSlice';

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
    const [profileImage, setProfileImage] = useState('');
    const [boothName, setBoothName] = useState();
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    
    useEffect(() => {
        dispatch(getMe());
    
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

            const response = await axios.delete(url);
            console.log("Product deleted:", response.data);
    
            // Optionally refresh the menu list after deletion
            loadBoothAndProducts();
    
            setShowPopupDeleteMenu(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    //pop up
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        productName: "",
        price: "",
        productType: "",
        productImage: null, // Image file
        previewImage: "", // Preview URL for the image
    });

    // Open and close popup functions
    const openPopup = (menu) => {
        if (!menu) {
            console.error("Product data is undefined");
            return;
        }
        setFormData({
            uuid: menu.uuid,
            productName: menu.name,
            price: menu.price,
            productType: menu.producttype,
            productImage: null, 
            previewImage: menu.image || "", 
        });
        setIsPopupOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        try {
            if (!formData.uuid) {
                console.error('No product ID provided for update');
                return;
            }
    
            // Membuat objek data yang dikirim
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.productName);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('producttype', formData.productType);

            if (formData.productImage) {
                
                formDataToSend.append('image', formData.productImage);
            }
            
            // for (let pair of formDataToSend.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
    

            const response = await axios.patch(`http://localhost:5000/product/${formData.uuid}`, formDataToSend,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Product updated successfully");
            loadBoothAndProducts(); 
            closePopup();
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error.message);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        
    };

    // Handle form input changes
    const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            
            setFormData(prev => {
                const newFormData = {
                    ...prev,
                    productImage: file,
                    previewImage: previewUrl
                };

                return newFormData;
            });
        }
    };


    const handleCancel = () => {
        // setFormData({
        //   name: "",
        //   email: "",
        //   password: "",
        //   phonenumber: "",
        // });
        closePopup();
    };

    
    return(
        <div className='dashboard-seller'>
            
                <Header/>

                <div className="header-profile-seller">
                
                    <div className={`header-images ${storeClosed ? 'store-closed' : ''}`}>
                        <img src={`http://localhost:5000/uploads/${profileImage}`} alt="Error"/>
                        
                    </div>

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
                
                <nav className='navmenu'>
                    <div class="menu">
                        <ul>
                            <li>
                                <a href="#" className="menu-item" onClick={() => navigate('/ListMenuSeller')}>
                                    {/* <FontAwesomeIcon icon={faUtensils} size="2x" /> */}
                                    <span className="menu-text">List Menu</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="menu-item" onClick={() => navigate('/OrderListSeller')}>
                                    {/* <FontAwesomeIcon icon={faGlassWater} size="2x" /> */}
                                    <span className="menu-text">Order List</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                
            <h2 className="list-menu-title">List Menu {boothName}</h2>
            
            <div className="menu-list">

                {menus.map((menu) => (
                    
                    <div key={menu.id} className="menu-item">
                        
                        <img 
                            src={`http://localhost:5000/uploads/${menu.image}`} 
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
                                
                                <button onClick={() => openPopup(menu)}>Edit</button>

                                {isPopupOpen && (
                                    <div className="popup-overlay-update">
                                        <div className="popup-content-admin-booth">
                                        <span className="close" onClick={closePopup}>
                                            &times;
                                        </span>
                                        <h2>Edit Menu</h2>

                                        {formData.previewImage && (
                                        <img src={formData.previewImage} alt="Product" className="product-image" />
                                        )}

                                        <form onSubmit={handleUpdate}>
                                            <label htmlFor="Productname">Name Product:</label>
                                            <input className='input-update-booth-admin'
                                            type="text"
                                            id="productName"
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleChange}
                                            placeholder="Enter name Product"
                                            />

                                            <label htmlFor="price">Price:</label>
                                            <input className='input-update-booth-admin'
                                            type="text"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="Enter Price"
                                            />

                                            <label htmlFor="productType">Product Type:</label>
                                            <select className='select-type'
                                            id="productType"
                                            name="productType"
                                            value={formData.productType}
                                            onChange={handleChange}
                                            placeholder='Select Type'
                                            >

                                            <option value="Food">Food</option>
                                            <option value="Drink">Drink</option>
                                            <option value="Dessert">Dessert</option>
                                            </select>

                                            <label htmlFor="productImage">Product Image:</label>
                                            {/* <button type='file'></button> */}
                                            <input
                                            className='image-input'
                                            type="file"
                                            id="productImage"
                                            name="productImage"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            />  

                                            <div className="form-buttons">
                                            <button className='button-admin-booth-save' type="submit">Save</button>
                                            <button  className='button-admin-booth-cancel' type="button" onClick={handleCancel}>Cancel</button>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                )}
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
            
            {isEditPopupOpen&&(
                <div className="popup-overlay">
                <div className="popup">
                    <EditMenuSeller
                    menu={selectedMenu}
                    onClose={handleCloseEditPopup}/>
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

export default Sellerpage;