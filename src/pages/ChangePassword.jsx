import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import '../style/ChangePassword.css';

function ChangePassword() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState("");
    const [confNewpassword, setConfNewpassword] = useState("");
    const [msg, setMsg] = useState("");

    const { user, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe()); // Fetch user data when component mounts
        console.log(user);
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching user:", message);
            navigate("/"); // Redirect if there's an error
        }
    }, [isError, navigate, message]);

    const changePassword = async (e) => {
      e.preventDefault();

      if (newPassword !== confNewpassword) {
          setMsg("Passwords do not match");
          return;
      }

      if (!newPassword || !confNewpassword) {
          setMsg("Please fill in all the fields!");
          return;
      }

      try {
          const response = await axios.patch(`http://localhost:5000/user/${user.uuid}`, {
              password: confNewpassword, // Send the new password for updating
          });
          setMsg("Password is saved");
        //   console.log("User password updated successfully:", response.data);
          navigate("/"); // Redirect after successful password update
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          } else {
              setMsg("An unexpected error occurred.");
          }
      }
  };

    const cancel = async (e) => {
        if(user.roleId===1){
            navigate("/adminbuyer");
        }else if(user.roleId === 2){
            navigate("/dashboard");
        }else if(user.roleId === 3){
            navigate("/sellerpage");
        }else if(user.roleId === 4){
            navigate("/deliverypage");
        }
    };

  return (
    <div className='changePassword'>
        <div className="wrapperChangepassword">
            <h1>Change Password</h1>
            <form>
                {msg && <p>{msg}</p>}
                <h5 className='resetText'>New Password:</h5>
                <input type="Password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                <h5 className='resetText'>Confirm New Password:</h5>
                <input type="password" placeholder="Confirm Password" value={confNewpassword} onChange={(e) => setConfNewpassword(e.target.value)}></input>
                <button className="button-save-cancel-password" onClick={changePassword}>Save</button>
                <button className="button-save-cancel-password" onClick={cancel}>Cancel</button>
            </form>
        </div>
    </div>
  );
}

export default ChangePassword;