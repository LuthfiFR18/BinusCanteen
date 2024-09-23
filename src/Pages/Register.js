
import '../Style/Register.css';

<div className="wrapper">
        <h1>Registration</h1>
        <form action="#">
            <h5>First Name:</h5>
            <input type="text" placeholder="First Name"></input>
            <h5>Last Name:</h5>
            <input type="text" placeholder="Last Name"></input>
            
            <h5>Email:</h5>
            <input type="email" placeholder="email"></input>
            
            <h5>Password:</h5>
            <input type="password" placeholder="password"></input>
            
            <h5>Confirm Password:</h5>
            <input type="password" placeholder="Confirm Password"></input>
            
            <h5>Number:</h5>
            <input type="number" placeholder="Phone Number"></input>
            
            <h5>Role:</h5>
            <div className="select-menu">
                <div className="select-btn">
                    <span class="sBtn-text">Select Role</span>
                    <i class='bx bx-chevron-down'></i>
                </div>
                <ul class="options">
                    <li className="option">
                        <span class="option-text">Binusian</span>
                    </li>
                    <li className="option">
                        <span class="option-text">Seller</span>
                    </li>
                    <li className="option">
                        <span class="option-text">Delivery</span>
                    </li>
                </ul>
            </div>
          </form>
        <a href="/HTML/Login.html">
            <button>Register</button>
        </a>
    </div>