import React, { useEffect, useState } from 'react';
import '../style/Userlist.css'; // Impor file CSS eksternal
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



const Userlist = ({selectedLocation, search }) => {

  const [users, setUser ] = useState([]);
  const { id } = useParams();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [phonenumber, setPhoneNumber] = useState(""); 
  const [image, setImage] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    getUser();
    
  }, [selectedLocation, search, id]);

  const getUserById = async () => {
    if(id){
    
    try{
      const response = await axios.get(`http://localhost:5000/user${id}`)
      setName(response.data.name)
      setEmail(response.data.email)
      setPassword(response.data.password)
      setPhoneNumber(response.data.phonenumber)
      setImage(response.data.image)
    }catch (error){
      if(error.console){
        setMsg(error.response.data.msg);
      }
      
    }
    }
  }

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

  
  
  //Pop Up Function

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  
  const [formData, setFormData] = useState({
    uuid: "",
    name: "",
    email: "",
    password: "",
    phonenumber: "",
  });

  // Function to open the popup
  const openPopup = (user) => {
    setFormData({
      uuid: user.uuid || "", 
      name: user.name || "",
      email: user.email || "",
      password: user.password || "",
      phonenumber: user.phonenumber || "",
    });
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!formData.uuid) {
        console.error('No user ID provided for update');
        return;
      }
      await axios.patch(`http://localhost:5000/user/${formData.uuid}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phonenumber: formData.phonenumber,
        image: image
      });
      closePopup();
      await getUser();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    // setFormData({
    //   name: "",
    //   email: "",
    //   password: "",
    //   phonenumber: "",
    // });
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

      {users.map((users) => (

        <tr key={users.id}>
          <td>{users.uuid}</td>
          <td>{users.name}</td>
          <td>{users.email}</td>
          <td>{users.password}</td>
          <td>{users.phonenumber}</td>
          <td>{users.role ? users.role.name : 'Unknown'}</td>
          <td>
          <button className='button-admin-user-update'  onClick={() => openPopup(users)}>Update</button>
          <button className='button-admin-user-delete' onClick={() => deleteUser(users.uuid)}>Delete</button>

            {isPopupOpen && (
              <div className="popup-overlay-update">
                <div className="popup-content-admin">
                  <span className="close" onClick={closePopup}>
                    &times;
                  </span>
                  <h2>Update Data</h2>
                  <form onSubmit={handleUpdate}>
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
                      type="text"
                      id="phonenumber"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />

                    <div className="form-buttons">
                    <button className='button-admin-user-save' type="submit">Save</button>
                    <button className='button-admin-user-cancel' type="button" onClick={handleCancel}>
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
  );
};

export default Userlist;
