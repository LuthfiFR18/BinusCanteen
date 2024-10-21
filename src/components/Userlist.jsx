import React, { useEffect, useState } from 'react';
import '../style/Userlist.css'; // Impor file CSS eksternal

import axios from 'axios';



const Userlist = ({selectedLocation, search }) => {

  const [users, setUser ] = useState([]);
  


  useEffect(()=>{
    getUser();
    
    
  }, [selectedLocation, search]);

  const getUser = async () => {
    const response = await axios.get("http://localhost:5000/user");
    let filteredUsers = response.data;

    if (selectedLocation && selectedLocation !== 'All Users') {
            filteredUsers = filteredUsers.filter(users => users.role && users.role.name === selectedLocation);
        }

        // Filter berdasarkan pencarian (nama pengguna atau properti lainnya)
        if (search) {
            filteredUsers = filteredUsers.filter(users => users.name.toLowerCase().includes(search.toLowerCase())||
            users.email.toLowerCase().includes(search.toLowerCase())||users.uuid.toLowerCase().includes(search.toLowerCase())
            );
            
        }
    setUser(filteredUsers);
  };

  // const updateUser = async (userId) => {
  //   try {
  //     const responseUpdate = await axios.get(`http://localhost:5000/user/${userId}`);
  //     setFormData(
  //       name: responseUpdate.data.name,
  //       email: responseUpdate.data.email,
  //       password: responseUpdate.data.password,
  //       phonenumber: responseUpdate.data.phonenumber
        
  //     )
  //     console.log("Update Successful", responseUpdate.data)

  //   } catch (error) {
  //     console.error("Error Updating user:", error);
  //   }
   
  // }


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
  
  //Pop Up Function

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  // Function to open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission (you can add real update logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    closePopup(); // Close popup after submitting
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phonenumber: "",
    });
    closePopup();
  };


  

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
          <td>{users.uuid}</td>
          <td>{users.name}</td>
          <td>{users.email}</td>
          <td>{users.password}</td>
          <td>{users.phonenumber}</td>
          <td>{users.role ? users.role.name : 'Unknown'}</td>
          <td>
            <button to = {`/users/edit/${users.uuid}`} className='button-admin-update' onClick={openPopup}>Update</button>

            {isPopupOpen && (
              <div className="popup-overlay-update">
                <div className="popup-content">
                  <span className="close" onClick={closePopup}>
                    &times;
                  </span>
                  <h2>Update Data</h2>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input className='input-update-admin'
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />

                    <label htmlFor="email">Email:</label>
                    <input className='input-update-admin'
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />

                    <label htmlFor="password">Password:</label>
                    <input className='input-update-admin'
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                    <label htmlFor="phone number">Phone Number:</label>
                    <input className='input-update-admin'
                      type="number"
                      id="phonenumber"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />

                    <div className="form-buttons">
                      <button className='button-admin-seller-update' type="submit">Update</button>
                      <button  className='button-admin-seller-delete' type="button" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <button className='button-admin-delete' onClick={() => deleteUser(users.uuid)}>Delete</button>
          </td>
        </tr>
      ))}
  
      </tbody>
    </table>
  );
};

export default Userlist;
