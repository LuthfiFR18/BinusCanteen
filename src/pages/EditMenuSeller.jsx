import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/EditMenuSeller.css';
// import Loginwrap from '../Components/Loginwrap';
const EditMenuSeller = ({ menu, onSave }) => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [itemType, setItemType] = useState('');
    const [price, setPrice] = useState('');
  
    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
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
            <button className="back-button" onClick={() => navigate('/Sellerpage')}>
                <span className="arrow-left">&#8592;</span>
            </button>
            <div className="edit-menu-seller">
                <div className="image-upload">
                    <label htmlFor="imageUpload" className="image-upload-box">
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
                    <label htmlFor="nameProduct">Name Product:</label>
                    <input type="text" id="nameProduct" />
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
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" />
                </div>
  
                <div className="form-group">
                    <label>Item Type:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="Food"
                                checked={itemType === 'Food'}
                                onChange={handleItemTypeChange}
                            />
                            Food
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Drink"
                                checked={itemType === 'Drink'}
                                onChange={handleItemTypeChange}
                            />
                            Drink
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Dessert"
                                checked={itemType === 'Dessert'}
                                onChange={handleItemTypeChange}
                            />
                            Dessert
                        </label>
                    </div>
                </div>
  
                {itemType && (
                    <button className="save-button">Save</button>
                )}
            </div>
        </div>
    );
};
  
  export default EditMenuSeller;