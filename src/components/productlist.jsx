import React, {useEffect, useState} from 'react'
import '../style/ProductList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ProductList = ({selectedLocation, search }) => {



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
  



  return (
    <table className='product-table'>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name Product</th>
        <th>Price</th>
        <th>Product Type</th>
        <th>Seller Name</th>
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
    <td>{product.user && product.user.name ? product.user.name : 'Unknown'}</td>
    <td>
      <Link to={`/users/edit/${product.uuid}`} className='button-admin-update'>Update</Link>
      <button className='button-admin-delete' onClick={() => deleteProduct(product.uuidd)}>Delete</button>
    </td>
  </tr>
))}
        
    </tbody>
    </table>
  )
}

export default ProductList;