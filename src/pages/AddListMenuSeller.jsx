import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMenuContext } from '../app/MenuContext';
import { getMe } from '../features/authSlice';
import '../style/AddListMenuSeller.css';

function AddListMenuSeller() {
  const { menus, setMenus } = useMenuContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  // const location = useLocation();
  // const [userData, setUserData] = useState();

  const [booth, setBooth] = useState();

  const [menuData, setMenuData] = useState({
    name: '',
    price: '',
    itemType: '',
    image: null,
  });

  

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if (user && user.id) {
      getboothById();
    }
  }, [user]);

  const getboothById = async () => {
    try {
      const boothResponse = await axios.get(`http://localhost:5000/booth/${user.id}`);
      console.log("Booth response:", boothResponse.data);
      const boothData = boothResponse.data;
      setBooth(boothData);
      

    } catch (error) {
      console.error("Error fetching booth:", error);
    }
  };
  
  

  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setMenuData({ ...menuData, image: file });
    }
  };

    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === "price") {
          const rawValue = value.replace(/\D/g, ""); // Hapus karakter non-digit
          if (rawValue === "") {
              setMenuData({ ...menuData, price: "" }); // Izinkan input kosong
          } else {
              const formattedPrice = new Intl.NumberFormat("id-ID").format(rawValue);
              setMenuData({ ...menuData, price: `Rp ${formattedPrice}` });
            }
        } else {
          setMenuData({ ...menuData, [name]: value });
        }
    };


  const handleRadioChange = (e) => {
    setMenuData({ ...menuData, itemType: e.target.value });
  };

  const handleSave = async () => {
    
    if (!booth || !booth.booths || !booth.booths.id) {
      console.error("Booth data is missing or incomplete!");
      return;
    }

    const formData = new FormData();

    
    formData.append("image", menuData.image);
    formData.append("name", menuData.name);
    formData.append("price", menuData.price.replace(/Rp\s?|\.|,/g, "")); // Konversi harga ke angka
    formData.append("producttype", menuData.itemType);
    formData.append("boothId", booth.booths.id);
    formData.append("userId", booth.userId);

    console.log("Data to be sent:");

      for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
      }

      try {
     
        const productsResponse = await axios.post(`http://localhost:5000/product`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
            
          console.log("Product created successfully:", productsResponse.data);
          setMenuData(productsResponse.data);
      } catch (error) {
          console.error('Error Creating products:', error);
      
        };
    navigate('/Sellerpage');
  };

  return (
    <div className="add-menu-form">
        <button className="add-list-menu-seller-back-button" onClick={() => navigate('/Sellerpage')}>
                <span className="arrow-left">&#8592;</span>
        </button>
        <div className="image-upload-container" onClick={() => document.getElementById('imageUpload').click()}>
            {previewImage ? (
            <img src={previewImage} alt="Menu Preview" className="preview-image" />
            ) : (
            <div className="placeholder">Add Image Menu</div>
            )}
        </div>
        <input
            type="file"
            id="imageUpload"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
        />

        <div className="form-field">
            <label>Name Product:</label>
                <input
                    type="text"
                    name="name"
                    value={menuData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                />
        </div>

        <div className="form-field">
            <label>Price:</label>
                <input
                    type="text"
                    name="price"
                    value={menuData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                />
        </div>

        <div className="form-field">
            <label>Item Type:</label>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        value="Food"
                        checked={menuData.itemType === 'Food'}
                        onChange={handleRadioChange}
                    />
                    Food
                </label>
                <label>
                    <input
                        type="radio"
                        value="Drink"
                        checked={menuData.itemType === 'Drink'}
                        onChange={handleRadioChange}
                    />
                    Drink
                </label>
                <label>
                    <input
                        type="radio"
                        value="Dessert"
                        checked={menuData.itemType === 'Dessert'}
                        onChange={handleRadioChange}
                    />
                    Dessert
                </label>
            </div>
        </div>

      {menuData.itemType && (
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      )}
    </div>
  );
}

export default AddListMenuSeller;
