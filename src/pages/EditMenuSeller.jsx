import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMenuContext } from '../app/MenuContext';
import '../style/EditMenuSeller.css';
// import e from 'cors';
// import Loginwrap from '../Components/Loginwrap';
const EditMenuSeller = ({ onSave }) => {
    const navigate = useNavigate();
    // const [selectedImage, setSelectedImage] = useState(menu.image || null);
    // const [name, setName] = useState(menu.name || ''); 
    // const [itemType, setItemType] = useState(menu.itemType || 'Food');
    // const [price, setPrice] = useState(menu.price || '');
    // const [description, setDescription] = useState(menu.description || '');

    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [itemType, setItemType] = useState('Food');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const location = useLocation();
    const { menuId } = location.state || {};
    const { menus, updateMenu } = useMenuContext();

    // const menu = menus.find((menu) => menu.id === menuId);
    const menu = location.state?.menu;

    useEffect(() => {
        if (menu) {
            setSelectedImage(menu.image || null);
            setName(menu.name || '');
            setItemType(menu.itemType || 'Food');
            setPrice(menu.price || '');
            setDescription(menu.description || '');
        }
    }, [menu]);

    // if (!menu) {
    //     return <p>Menu not found</p>
    // }
  
    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const updatedMenu = {
            ...menu,
            name,
            price,
            description,
            image: selectedImage,
            itemType,
            // price,
        };
        updateMenu(updatedMenu);
        navigate('/Sellerpage');
    };
  
    // Handle radio button selection
    const handleItemTypeChange = (event) => {
        setItemType(event.target.value);
    };

    const formatPriceWithDots = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const handlePriceChange = (event) => {
        let rawValue = event.target.value.replace(/\./g, '');

        if (rawValue.length > 1 && rawValue.startsWith('0')) {
            return;
        }
        if(rawValue === '' || /^\d+$/.test(rawValue)) {
            setPrice(formatPriceWithDots(rawValue));
        }
    };
  
    return (
        <div className="edit-menu-seller-container">
            <button className="edit-menu-seller-back-button" onClick={() => navigate('/Sellerpage')}>
                <span className="arrow-left">&#8592;</span>
            </button>
            <div className="edit-menu-seller">
                <div className="image-upload">
                    <label htmlFor="imageUpload" className="edit-menu-seller-image-upload-box">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Menu Item" className="uploaded-image" />
                        ) : (
                            <span>Add Image Menu</span>
                        )}
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                </div>
  
                <div className="form-group">
                    <label htmlFor="nameProduct">Menu Name:</label>
                    <input type="text" id="nameProduct" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
  
                <div className="form-group">
                    <label htmlFor="price">Price (in Rupiah):</label>
                    <input 
                        type="text" 
                        id="price" 
                        value={price}
                        // onChange={(e) => setPrice(e.target.value)}
                        onChange={handlePriceChange}
                        placeholder="Enter Price"
                    />
                </div>
  
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
  
                <div className="form-group">
                    <label>Meal Type:</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" value="Food" checked={itemType === 'Food'} onChange={handleItemTypeChange} />
                            Food
                        </label>
                        <label>
                            <input type="radio" value="Drink" checked={itemType === 'Drink'} onChange={handleItemTypeChange}/>
                            Drink
                        </label>
                        <label>
                            <input type="radio" value="Dessert" checked={itemType === 'Dessert'} onChange={handleItemTypeChange}/>
                            Dessert
                        </label>
                    </div>
                </div>
  
                {itemType && (
                    <button className="save-button" onClick={handleSave}>Save</button>
                )}
            </div>
        </div>
    );
};
  
export default EditMenuSeller;