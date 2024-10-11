import React, { useEffect, useState } from 'react';
import '../style/Userlist.css'; // Impor file CSS eksternal
import { Link } from 'react-router-dom';
import axios from 'axios';



const Userlist = () => {

  const [users, setUser ] = useState([]);
  // const [roles, setRoles] = useState([]);

  useEffect(()=>{
    getUser();
    // getRole();
  }, []);

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/user");
    setUser(response.data);
  };


  const deleteUser = async (userId) => {
    try {
      const url = `http://localhost:5000/user/${userId}`;
      console.log("Deleting user at:", url); // Tambahkan log ini
      const response = await axios.delete(url);
      console.log("User deleted:", response.data);
      getUser();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  // const getRole = async () => {
  //   const response = await axios.get("http://localhost:5000/role");
  //   setRoles(response.data); // Store roles in the correct 'roles' state
  // };

  // const getRoleName = (roleId) => {
  //   const role = roles.find(r => r.id === roleId);
  //   return role ? role.name : 'Unknown'; // Return role name or 'Unknown' if not found
  // }

  //getRoleName(users.roleId)

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

      {users.map((users, index) => (

        <tr key={users.uuid}>
          <td>{index + 1}</td>
          <td>{users.name}</td>
          <td>{users.email}</td>
          <td>{users.password}</td>
          <td>{users.phonenumber}</td>
          <td>{users.role ? users.role.name : 'Unknown'}</td>
          <td>
            <Link to = {`/users/edit/${users.uuid}`} className='button-admin-update' onClick={() => alert('Update for Mamat')}>Update</Link>
            <button className='button-admin-delete' onClick={() => deleteUser(users.uuid)}>Delete</button>
          </td>
        </tr>
      ))}
  
      </tbody>
    </table>
  );
};

export default Userlist;
