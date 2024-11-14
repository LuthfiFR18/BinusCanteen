import '../style/ResetPassword.css';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');

    const [newPassword, setNewPassword] = useState("");
    const [confNewpassword, setConfNewpassword] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        if (location.state && location.state.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

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

      let uuid;

      try {
        const response = await axios.get(`http://localhost:5000/user/${email}`);
        // console.log(response.data);

        // console.log(response.data.uuid);
        uuid= response.data.uuid;

      } catch (error) {
        console.error(error);
        setMsg("User not found.");
      }

      try {
        const updateResponse = await axios.patch(`http://localhost:5000/user/${uuid}`, {
            password: confNewpassword, // Send the new password for updating
        });
        setMsg("Password is saved");
        // console.log("User password updated successfully:", updateResponse.data);
        navigate("/"); // Redirect after successful password update
      } catch (error) {
        console.error("Error during password update:", error);
        if (error.response && error.response.data && error.response.data.msg) {
            setMsg(error.response.data.msg);
        } else {
            setMsg("An unexpected error occurred.");
        }
      }
    }

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
          <button className="button-save-cancel-password" onClick={resetPassword}>Save</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;