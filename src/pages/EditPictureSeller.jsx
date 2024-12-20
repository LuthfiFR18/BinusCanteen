import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/EditPictureSeller.css';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// import Loginwrap from '../Components/Loginwrap';
function EditPictureSeller(){
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const inputFileRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [boothData, setBoothData] = useState("");

    useEffect(() =>{
        dispatch(getMe());
        if (user && user.id) {
            loadBooth();
        }
    },[user?.id])

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const loadBooth = async() =>{
        try {
           // Ambil Booth berdasarkan user.id
           const boothResponse = await axios.get(`http://localhost:5000/booth/${user.id}`);
           setBoothData(boothResponse.data);
           console.log("boothData: ", boothResponse.data); 
        } catch (error) {
            console.log("Cannot load booth", error)
        }
    }


    const handleSave = async () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);
            

            try {
                const boothId = boothData.booths.id;
                // Kirim request PATCH ke server dengan FormData
                const response = await axios.patch(`http://localhost:5000/booth/${boothId}`,formData,{
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log('Booth updated:', response.data);
                navigate('/Sellerpage'); // Setelah berhasil, arahkan ke halaman Sellerpage
            } catch (error) {
                console.error("There was an error uploading the image!", error);
            }
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
                        ref={inputFileRef}
                        style={{display: 'none'}}
                        accept="image/*" 
                        onChange={handleImageUpload} 
                    />
                </div> 
            </div>
            

            {preview && (
                <button className="save-button-edit-picture-seller" onClick={handleSave}>
                    Save
                </button>
            )}
        </div>
    );
}

export default EditPictureSeller;