import React from 'react'
import '../style/ProductList.css';

function ProductList() {
  return (
    <table className='product-table'>
    <thead>
      <tr>
        <th>Name Product</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ayam Gulai</td>
            <td>Rp.30.000</td>
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