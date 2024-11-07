import '../style/ResetPassword.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import axios from 'axios';

function ResetPassword() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [newPassword, setNewPassword] = useState("");
    const [confNewpassword, setConfNewpassword] = useState("");
    const [msg, setMsg] = useState("");

    const { user, isError, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe()); // Fetch user data when component mounts
        console.log(user.uuid);
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching user:", message);
            navigate("/"); // Redirect if there's an error
        }
    }, [isError, navigate, message]);

    const resetPassword = async (e) => {
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
          console.log("User password updated successfully:", response.data);
          navigate("/"); // Redirect after successful password update
      } catch (error) {
          if (error.response) {
              setMsg(error.response.data.msg);
          } else {
              setMsg("An unexpected error occurred.");
          }
      }
  };

  return (
    <div className='resetPassword'>
        <div className="wrapperResetpassword">
            <h1>Reset Password</h1>
            <form>
                {msg && <p>{msg}</p>}
                <h5 className='resetText'>New Password:</h5>
                <input type="Password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                <h5 className='resetText'>Confirm New Password:</h5>
                <input type="password" placeholder="Confirm Password" value={confNewpassword} onChange={(e) => setConfNewpassword(e.target.value)}></input>
                <button className="button" onClick={resetPassword}>Save</button>
            </form>
        </div>
    </div>
  );
}

export default ResetPassword