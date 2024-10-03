import React from 'react';
import '../style/Userlist.css'; // Impor file CSS eksternal

const Userlist = () => {
  return (
    <table className='user-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01</td>
          <td>Mamat</td>
          <td>mamat123@gmail.com</td>
          <td>abah2314</td>
          <td>081112233445522</td>
          <td>Seller</td>
          <td>
            <button className='button-admin-update' onClick={() => alert('Update for Mamat')}>Update</button>
            <button className='button-admin-delete' onClick={() => alert('Delete for Mamat')}>Delete</button>
          </td>
        </tr>
        <tr>
          <td>01</td>
          <td>Mamat</td>
          <td>mamat123@gmail.com</td>
          <td>abah2314</td>
          <td>081112233445522</td>
          <td>Seller</td>
          <td>
          <button className='button-admin-update' onClick={() => alert('Update for Mamat')}>Update</button>
          <button className='button-admin-delete' onClick={() => alert('Delete for Mamat')}>Delete</button>
          </td>
        </tr>
        <tr>
          <td>01</td>
          <td>Mamat</td>
          <td>mamat123@gmail.com</td>
          <td>abah2314</td>
          <td>081112233445522</td>
          <td>Seller</td>
          <td>
          <button className='button-admin-update' onClick={() => alert('Update for Mamat')}>Update</button>
          <button className='button-admin-delete' onClick={() => alert('Delete for Mamat')}>Delete</button>
          </td>
        </tr>
        <tr>
          <td>01</td>
          <td>Mamat</td>
          <td>mamat123@gmail.com</td>
          <td>abah2314</td>
          <td>081112233445522</td>
          <td>Seller</td>
          <td>
          <button className='button-admin-update' onClick={() => alert('Update for Mamat')}>Update</button>
          <button className='button-admin-delete' onClick={() => alert('Delete for Mamat')}>Delete</button>
          </td>
        </tr>
        {/* Tambahkan lebih banyak baris di sini jika diperlukan */}
      </tbody>
    </table>
  );
};

export default Userlist;
