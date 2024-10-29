import '../style/ResetPassword.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/ChangePassword.css'
function ChangePassword() {
    const navigate = useNavigate();

  return (
    <div className='changePassword'>
        <div className="wrapperChangepassword">
            <h1>Change Password</h1>
            <form action="#">
                <h5 className='resetText'>New Password:</h5>
                <input type="Password" placeholder="New Password"></input>
                <h5 className='resetText'>Confirm New Password:</h5>
                <input type="password" placeholder="Confirm Password"></input>
                <button className="button-change-password" onClick={()=> navigate('/')}>Save</button>
                <button className="button-change-password" onClick={()=> navigate('/dashboard')}>cancel</button>
            </form>
        </div>
    </div>
  );
}

export default ChangePassword;