// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useMenuContext } from '../app/MenuContext';
// import '../style/EditMenuSeller.css';
// import axios from 'axios';
// // import e from 'cors';
// // import Loginwrap from '../Components/Loginwrap';
// // const EditMenuSeller = ({ onSave }) => {
// const EditMenuSeller = ({ menu, onClose }) => {
//     const navigate = useNavigate();
//     // const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(menu?.image || null);
//     // const [name, setName] = useState('');
//     const [name, setName] = useState(menu?.name || '');
//     // const [itemType, setItemType] = useState('Food');
//     const [itemType, setItemType] = useState(menu?.itemType || 'Food');
//     // const [price, setPrice] = useState('');
//     const [price, setPrice] = useState(menu?.price || '');
//     // const [description, setDescription] = useState('');
//     const [description, setDescription] = useState(menu?.description || '');
//     const location = useLocation();
//     const { menuId } = location.state || {};
//     const { updateMenu } = useMenuContext();
//     // const menu = location.state?.menu;


//     useEffect(()=>{
//         getProduct();
//     }, []);

//     const getProduct = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/product/${menuUuid}`); // Menambahkan UUID di URL
//             const productData = response.data;
//             setMenu(productData);
//             setName(productData.name);
//             setItemType(productData.producttype || 'Food');
//             setPrice(formatPriceWithDots(productData.price?.toString().replace(/\D/g, '') || 'Rp. 0'));
//             setSelectedImage(productData.image || null);
//         } catch (error) {
//             console.error('Error fetching product:', error);
//         }
//     };



//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedImage(file); 
//         }
//     };

//         const [formData, setFormData] = useState({
        
//             productName: "",
//             price: "",
//             productType: "",
//             sellerName: "",
//             productImage: null, // Image file
//             previewImage: "", // Preview URL for the image
//         });

//         const handleSave = async () => {
//             // Pastikan formData terisi dengan benar
//             const rawPrice = price.replace(/\D/g, ''); // Menghapus karakter non-digit
//             const updatedProduct = {
//                 uuid: menu.uuid,
//                 name: name,
//                 price: parseInt(rawPrice),
//                 producttype: itemType,
//                 image: selectedImage,
//             };
        
//             try {
//                 await axios.patch(`http://localhost:5000/product/${menu.uuid}`, updatedProduct); // Menggunakan UUID dari menu yang ada
//                 console.log("Product updated successfully");
//                 getProduct(); // Menarik data terbaru
        
//                 navigate('/Sellerpage'); // Navigasi kembali setelah sukses
//             } catch (error) {
//                 console.error('Error saving product:', error);
//             }
//         };
//         // updateMenu(updatedMenu);
//         // navigate('/Sellerpage');
//         console.log("Updated Menu:", updatedMenu);
//         onClose();
        
    
  
//     // Handle radio button selection
//     const handleItemTypeChange = (event) => {
//         setItemType(event.target.value);
//     };

//     const formatPriceWithDots = (value) => {
//         if (!value) return 'Rp. 0';
//         return `Rp. ${value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
//     }

//     const handlePriceChange = (event) => {
        
//         const rawValue = event.target.value.replace(/\D/g, '');
//         setPrice(formatPriceWithDots(rawValue));
//     };

//     return (
//         <div className="edit-menu-seller-container">
//             {/* <button className="edit-menu-seller-back-button" onClick={() => navigate('/Sellerpage')}>
//                 <span className="arrow-left">&#8592;</span>
//             </button> */}
//             {/* <button className="close-popup-btn" onClick={onClose}>
//                 &#x2715;
//             </button> */}
//             <button className="close-popup-btn" onClick={onClose}>
//                 &#x2715;
//             </button>
//             <div className="edit-menu-seller">
//                 {/* <button className="close-popup-btn" onClick={onClose}>
//                     &#x2715;
//                 </button> */}
//                 <div className="image-upload">
//                     <label htmlFor="imageUpload" className="edit-menu-seller-image-upload-box">
//                         {selectedImage ? (
//                             <img src={selectedImage} alt="Menu Item" className="uploaded-image" />
//                         ) : (
//                             <span>Add Image Menu</span>
//                         )}
//                     </label>
//                     <input
//                         type="file"
//                         id="imageUpload"
//                         accept="image/*"
//                         style={{ display: 'none' }}
//                         onChange={handleImageUpload}
//                         // onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files[0]))}
//                     />
//                 </div>
  
//                 <div className="form-group">
//                     <label htmlFor="nameProduct">Menu Name:</label>
//                     <input type="text" id="nameProduct" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>
  
//                 <div className="form-group">
//                     <label htmlFor="price">Price (in Rupiah):</label>
//                     <input 
//                         type="text" 
//                         id="price" 
//                         value={price}
//                         // onChange={handlePriceChange}
//                         // onChange={(e) => setPrice(e.target.value)}
//                         onChange={(e) => handlePriceChange(e)}
//                         placeholder="Enter Price"
//                     />
//                 </div>
  
//                 {/* <div className="form-group">
                    
//                 </div> */}
  
//                 <div className="form-group">
//                     <label>Meal Type:</label>
//                     <div className="radio-group">
//                         <label>
//                             <input type="radio" value="Food" checked={itemType === 'Food'} onChange={handleItemTypeChange} />
//                             {/* <input type="radio" value="Food" checked={itemType === 'Food'} onChange={(e) => setItemType(e.target.value)} /> */}
//                             {/* <input type="radio" value="Food" checked={itemType === 'Food'} onChange={(e) => setItemType(e.target.value)} /> */}
//                             Food
//                         </label>
//                         <label>
//                             {/* <input type="radio" value="Drink" checked={itemType === 'Drink'} onChange={(e) => setItemType(e.target.value)}/> */}
//                             <input type="radio" value="Drink" checked={itemType === 'Drink'} onChange={handleItemTypeChange}/>
//                             Drink
//                         </label>
//                         <label>
//                             {/* <input type="radio" value="Dessert" checked={itemType === 'Dessert'} onChange={(e) => setItemType(e.target.value)}/> */}
//                             <input type="radio" value="Dessert" checked={itemType === 'Dessert'} onChange={handleItemTypeChange}/>
//                             Dessert
//                         </label>
//                     </div>
//                 </div>
  
//                 {itemType && (
//                     <button className="save-button" onClick={handleSave}>Save</button>
//                 )}
//             </div>
//         </div>
//     );
// };
  
// export default EditMenuSeller;