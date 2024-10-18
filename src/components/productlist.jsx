import React, {useState} from 'react'
import '../style/ProductList.css';


const ProductList = () => {

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
        <tr>
            <td>01</td>
            <td>Ayam Gulai</td>
            <td>Rp.30.000</td>
            <td>Food</td>
            <td>Mamat Suryono Cahyadi</td>
            <td>
                <button className='button-admin-seller-update'>Update</button>
                <button className='button-admin-seller-delete'>Delete</button>
            </td>
        </tr>
    </tbody>
    </table>
  )
}

export default ProductList;