import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuContext } from '../app/MenuContext';
import '../style/AddListMenuSeller.css';

function AddListMenuSeller() {
  const { menus, setMenus } = useMenuContext();
  const navigate = useNavigate();

  const [menuData, setMenuData] = useState({
    name: '',
    price: '',
    description: '',
    itemType: '',
    image: null,
  });

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

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'price') {
//       // Format price to add Rp and separate thousands
//       const formattedPrice = value.replace(/\D/g, ''); // Only allow digits
//       if (formattedPrice.startsWith('0')) return; // Prevent leading zero
//       const priceWithDots = new Intl.NumberFormat('id-ID').format(formattedPrice);
//       setMenuData({ ...menuData, price: `Rp ${priceWithDots}` });
//     } else {
//       setMenuData({ ...menuData, [name]: value });
//     }
//   };

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

  const handleSave = () => {
    const newMenu = {
      ...menuData,
      id: menus.length + 1, // Generate unique ID
      isOutOfStock: false,
      image: previewImage,
    };
    setMenus([...menus, newMenu]);
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
            <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={menuData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
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
