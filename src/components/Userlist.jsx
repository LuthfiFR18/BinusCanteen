import React, { useEffect, useState } from 'react';
import '../style/Userlist.css'; // Impor file CSS eksternal
import { Link } from 'react-router-dom';
import axios from 'axios';


const Userlist = () => {

  const [user, setUser ] = useState([]);

  useEffect(()=>{
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/user");
    setUser(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/user/${userId}`);
    getUser();
  }


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

      {user.map((user, index) => (

        <tr key={user.uuid}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.phonenumber}</td>
          <td>{user.roleId}</td>
          <td>
            <button className='button-admin-update' onClick={() => alert('Update for Mamat')}>Update</button>
            <button className='button-admin-delete' onClick={() => alert('Delete for Mamat')}>Delete</button>
          </td>
        </tr>
      ))}
  
      </tbody>
    </table>
  );
};

export default Userlist;
