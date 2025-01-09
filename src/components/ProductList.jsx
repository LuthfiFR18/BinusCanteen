import React, {useEffect, useState} from 'react'
import '../style/ProductList.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const ProductList = ({selectedBooth, search }) => {

  const [users, setUser ] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [phonenumber, setPhoneNumber] = useState(""); 
  const [image, setImage] = useState("");

    useEffect(()=>{
      getProducts();
      getBooths();
    }, [selectedBooth, search]);


    const [products, setProduct ] = useState([]);
    const [booths, setBooths] = useState([]);

    const getProducts = async () => {

      const response = await axios.get("http://localhost:5000/product");
      let filteredProduct = response.data;

          // Filter berdasarkan pencarian
          if (search) {
            filteredProduct = filteredProduct.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedBooth) {
          filteredProduct = filteredProduct.filter(product =>
            product.booth && product.booth.name === selectedBooth
          );
        }
    
    
        
      setProduct(filteredProduct);
    };

    const getBooths = async () => {
      try {
        const response = await axios.get('http://localhost:5000/booth');
        setBooths(response.data); 
      } catch (error) {
        console.error('Error fetching booths:', error);
      }
    };

    const deleteProduct = async (productId) => {
      try {
          const url = `http://localhost:5000/product/${productId}`; 
          console.log("Deleting product at:", url);
          const response = await axios.delete(url);
          console.log("Product deleted:", response.data);
          getProducts();
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
      uuid: product.uuid,
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!formData.uuid) {
        console.error('No product ID provided for update');
        return;
      }

        await axios.patch(`http://localhost:5000/product/${formData.uuid}`, {
            name: formData.productName,
            price: parseInt(formData.price),
            producttype: formData.productType,
            sellerName: formData.sellerName,
            image: formData.productImage
        });
        console.log("Product updated successfully");
        getProducts(); // Refresh daftar produk
        closePopup();
    } catch (error) {
        console.error("Error updating product:", error);
    }
};


  const handleCancel = () => {

    closePopup();
  };
  


  return (
        <table className='product-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Booth Name</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Product Type</th>
              <th>Seller Name</th>
              <th>Action</th>
            </tr>
          </thead>

        <tbody className='table-container'>
        {products.map((product, index) => (

        <tr key={product.uuid}>
        <td>{index + 1}</td>
        <td>{product.booth && product.booth.name ? product.booth.name : 'Unknown'}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.producttype}</td>
        <td>{product.user && product.user.name ? product.user.name : 'Unknown'}</td>
        <td>
        <button className='button-admin-booth-update' onClick={() => openPopup(product)}>Update</button>
        <button className='button-admin-booth-delete' onClick={() => deleteProduct(product.uuid)}>Delete</button>

            {isPopupOpen && (
              <div className="popup-overlay-update">
                <div className="popup-content-admin-booth">
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

                    <label htmlFor="productImage">Product Image:</label>
                      {/* <button type='file'></button> */}
                    <input
                      className='image-input'
                      type="file"
                      id="productImage"
                      name="productImage"
                      onChange={handleImageChange}
                      accept="image/*"
                    />  

                    <div className="form-buttons">
                    <button className='button-admin-booth-save' type="submit">Save</button>
                    <button  className='button-admin-booth-cancel' type="button" onClick={handleCancel}>Cancel</button>
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

  )
}

export default ProductList;
