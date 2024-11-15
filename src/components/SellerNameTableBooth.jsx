import React, {useEffect, useState} from 'react'
import '../style/SellerNameTableBooth.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const SellerNameTableBooth = ({selectedLocation, search }) => {

  const [users, setUser ] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [phonenumber, setPhoneNumber] = useState(""); 
  const [image, setImage] = useState("");

    useEffect(()=>{
      getProducts();
      
    }, [selectedLocation, search]);


    const [products, setProduct ] = useState([]);

    const getProducts = async () => {

      
      const response = await axios.get("http://localhost:5000/product");

      
      let filteredProduct = response.data;
  
  
          // Filter berdasarkan pencarian
          if (search) {
            filteredProduct = filteredProduct.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        
      setProduct(filteredProduct);
    };

    const deleteProduct = async (productId) => {
      try {
          const url = `http://localhost:5000/product/${productId}`; // Pastikan productId adalah UUID yang sesuai
          console.log("Deleting product at:", url); // Tambahkan log ini
          const response = await axios.delete(url);
          console.log("Product deleted:", response.data);
          getProducts(); // Panggil kembali fungsi untuk memperbarui daftar produk
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
    sellerName: "",
    productImage: null, // Image file
    previewImage: "", // Preview URL for the image
  });

  // Open and close popup functions
  const openPopup = (product) => {
    setFormData({
      productName: product.name,
      price: product.price,
      productType: product.producttype,
      sellerName: product.user ? product.user.name : "",  
      productImage: null, 
      previewImage: product.image || "", 
    });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      productName: "",
      price: "",
      productType: "",
      sellerName: "",
      productImage: null,
      previewImage: "",
    });
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
    setFormData({
      ...formData,
      productImage: file,
      previewImage: URL.createObjectURL(file), // Create URL for preview
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Product Data:", formData);
    closePopup();
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="dropdown-booth-container">
      <button
        className={`dropdown-booth-button ${isOpen ? 'active' : ''}`}
        onClick={toggleDropdown}
      >Seller Name <span className='booth-name-seller'>/ Nara Kitchen</span>
        {/* {isOpen ? 'Hide Table' : 'Show Table'} */}
      </button>
      <div className={`dropdown-booth-table ${isOpen ? 'open-booth-table' : 'closed-booth-table'}`}>
    <table className='booth-table'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name Product</th>
        <th>Price</th>
        <th>Product Type</th>
        <th>Action</th>
      </tr> 
    </thead>
    <tbody>

    {products.map((product, index) => (

    <tr key={product.uuid}>
    <td>{index + 1}</td>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.producttype}</td>
    {/* <td>{product.user && product.user.name ? product.user.name : 'Unknown'}</td> */}
    <td>
    <button className='booth-table-update'  onClick={() => openPopup(product)}>Update</button>
      <button className='booth-table-delete' onClick={() => deleteProduct(product.uuid)}>Delete</button>

        {isPopupOpen && (
          <div className="popup-overlay-update">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <h2>Update Data</h2>

              {formData.previewImage && (
              <img src={formData.previewImage} alt="Product" className="product-image" />
            )}

              <form onSubmit={handleUpdate}>
                <label htmlFor="Productname">Name Product:</label>
                <input className='input-update-booth-admin'
                  type="text"
                  id="name"
                  name="name"
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

                <label htmlFor="sellername">Seller Name:</label>
                <input className='input-update-booth-admin'
                  type="text"
                  id="sellername"
                  name="sellername"
                  value={formData.sellerName}
                  onChange={handleChange}
                  placeholder="input name seller"
                />

                {/* <label htmlFor="productImage">Product Image:</label>
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  onChange={handleImageChange}
                  accept="image/*"
                />   */}

                <div className="form-buttons">
                <button className='button-admin-booth-update' type="submit">Save</button>
                  <button  className='button-admin-booth-delete' type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </td>
    </tr>
  ))}
        
  </tbody>
  </table>
  </div>
  </div>
  )
}

export default SellerNameTableBooth;
