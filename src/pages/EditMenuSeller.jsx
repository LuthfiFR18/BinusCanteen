import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMenuContext } from '../app/MenuContext';
import '../style/EditMenuSeller.css';
// import e from 'cors';
// import Loginwrap from '../Components/Loginwrap';
const EditMenuSeller = ({ onSave }) => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [itemType, setItemType] = useState('Food');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const location = useLocation();
    const { menuId } = location.state || {};
    const { updateMenu } = useMenuContext();
    const menu = location.state?.menu;

    useEffect(() => {
        if (menu) {
            setSelectedImage(menu.image || null);
            setName(menu.name || '');
            setItemType(menu.itemType || 'Food');
            setPrice(formatPriceWithDots(menu.price.replace(/\D/g, '') || 'Rp. 0'))
            setDescription(menu.description || '');
        }
    }, [menu]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        const rawPrice = price.replace(/\D/g, '');
        const updatedMenu = {
            ...menu,
            name,
            price: formatPriceWithDots(rawPrice),
            description,
            image: selectedImage,
            itemType,
        };
        updateMenu(updatedMenu);
        navigate('/Sellerpage');
    };
  
    // Handle radio button selection
    const handleItemTypeChange = (event) => {
        setItemType(event.target.value);
    };

    const formatPriceWithDots = (value) => {
        if (!value) return 'Rp. 0';
        return `Rp. ${value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }

    const handlePriceChange = (event) => {
        
        const rawValue = event.target.value.replace(/\D/g, '');
        setPrice(formatPriceWithDots(rawValue));
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
                        
                        onChange={handlePriceChange}
                        placeholder="Enter Price"
                    />
                </div>
  
                <div className="form-group">
                    
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