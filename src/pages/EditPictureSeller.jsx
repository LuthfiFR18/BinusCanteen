import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/EditPictureSeller.css';
// import Loginwrap from '../Components/Loginwrap';
function EditPictureSeller(){
    const navigate = useNavigate();
    // const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // const imagename = e.target.files[0].name;
        
        // if(file){
        //     setImage(file);
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         setPreview(reader.result);
        //     };
        //     reader.readAsDataURL(file);
        // }

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if(preview){
            // onSave(preview);
            localStorage.setItem('savedImage', preview);
            navigate('/Sellerpage');
        }
    };

    return(
        <div className="edit-picture-seller">
            <button className="back-button" onClick={() => navigate('/Sellerpage')}>
                <span className="arrow-left">&#8592;</span>
            </button>

            <div className="image-upload-box">
                {preview ? (
                    <img src={preview} alt="Uploaded Preview" className="preview-image" />
                ) : (
                    <div 
                        className="upload-placeholder"
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        <div className="plus-icon">+</div>
                        <p>Add Image for cover</p>
                        <input 
                            type="file" 
                            id="file-input"
                            style={{display: 'none'}}
                            accept="image/*" 
                            onChange={handleImageUpload} 
                        />
                    </div>
                )}
            </div>

            {preview && (
                <button className="save-button" onClick={handleSave}>
                    Save
                </button>
            )}
        </div>
    );
}

export default EditPictureSeller;