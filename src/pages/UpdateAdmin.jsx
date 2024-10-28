// import React, {useEffect, useState} from 'react'
// import '../style/UpdateAdmin.css'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// function UpdateAdmin() {


//   const navigate = useNavigate();

//   const { id } = useParams();
//   const [name, setName] = useState(""); 
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState(""); 
//   const [phonenumber, setPhoneNumber] = useState(""); 
//   const [image, setImage] = useState("");

//   const [msg, setMsg] = useState("");
  
  

//   const handleUpdate = async () => {
//     try {
//        await axios.patch(`http://localhost:5000/user${id}`, {
//         name: name,
//         email: email,
//         password: password,
//         phonenumber: phonenumber,
//         image: image
//       });
//       navigate('/adminbuyer');

//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

  

//   return (
//     <div className="update-admin-container">
//     <div className="wrapper-update-admin">
//       <h1 className='update-title'>Update <br /> Customer</h1>

//       <form action="#">
//           <h5 className='updateform'>Name:</h5>
//           <input type="text" placeholder="Name" id="name-input" onChange={(e) => setName(e.target.value)}></input>
              
//           <h5 className='updateform'>Phone Number:</h5>
//           <input type="text" placeholder="Phone Number" id="phonenumber-input" onChange={(e) => setPhoneNumber(e.target.value)}></input>

//           <h5 className='updateform'>Email:</h5>
//           <input type="email" placeholder="Email" id="email-input" onChange={(e) => setEmail(e.target.value)}></input>
              
//           <h5 className='updateform'>Password:</h5>
//           <input type="password" placeholder="Password" id="password-input" onChange={(e) => setPassword(e.target.value)}></input>
              
//       </form>

//       <button className="button-update" onClick={handleUpdate}>
//         Update
//       </button>
//     </div>
//     </div>
//     )
// }

// export default UpdateAdmin;