import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/EditPictureSeller.css';
// import Loginwrap from '../Components/Loginwrap';
function EditPictureSeller(){
    const navigate = useNavigate();
    // const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const inputFileRef = useRef(null);

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
            <div className="back-button-container">
                <button className="edit-picture-seller-back-button" onClick={() => navigate('/Sellerpage')}>
                    <span className="arrow-left">&#8592;</span>
                </button>
            </div>

            <div className="image-upload-box-container">
                <div className="edit-picture-seller-image-upload-box">
                    {preview ? (
                        <img src={preview} alt="Uploaded Preview" className="preview-image" onClick={() => inputFileRef.current && inputFileRef.current.click()} />
                    ) : (
                        <div 
                            className="upload-placeholder"
                            onClick={() => inputFileRef.current && inputFileRef.current.click()}
                        >
                            <div className="plus-icon">+</div>
                            <p>Add Image for cover</p>
                        </div>
                    )}
                    <input 
                        type="file" 
                        // id="file-input"
                        ref={inputFileRef}
                        style={{display: 'none'}}
                        accept="image/*" 
                        onChange={handleImageUpload} 
                    />
                </div> 
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