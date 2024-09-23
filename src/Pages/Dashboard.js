
import '../Style/Dashboard.css';

function Dashboard(){
    return(
        <div className='dashboard'>
        <div class="navbar1">
            <nav>
                {/* <!--Logo--> */}
                <a href="#" class="logo">
                    <h4>BINUS <span>Canteen</span></h4>
                </a>
                {/* <!--search bar--> */}
                <div class="search-box">
                    <div class="row">
                        <input type="text" id="input-box" placeholder="Search"
                        autocomplete="off"></input>
                        <button>
                            <i class='bx bx-search'></i>
                        </button>
                    </div>
                    <div class="result-box"></div>
                </div>
                
                {/* <!--Logo Cart--> */}
                <div class="logo-cart">
                    <a href="#">
                    <i class='bx bxs-cart-alt'></i>
                    </a>
                </div>
                {/* <!--Profile--> */}
                <a href="#">
                    <div class="profile" onclick="toggleMenu()">
                        <i class='bx bxs-user'></i>
                    </div>
                </a>
                <div class="sub-menu-warp" id="subMenu">
                    <div class="sub-menu">
                        <div class="user-info">
                            <img src="/Assets/img/profile.png"></img>                            
                            <h5>Surya Kencana</h5>
                            <h6>surya.kencana@gmail.com</h6>
                        </div>
                        <a href="#">
                            <p>Setting</p>
                        </a>
    
                        <a href="#">
                            <p>History</p>
                        </a>
                        <a href="#">
                            <p>Log Out</p>
                        </a>
                    </div>
                </div>
            </nav>
        </div>

<nav>
    <div class="menu">
        <ul>
            <li>
                <a href="#">
                    <i class="ri-restaurant-line"></i>
                    Meals
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="ri-drinks-fill"></i>
        
                    Drink
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="ri-cake-3-fill"></i>
                                        
                    Dessert
                </a>
            </li>
        </ul>
    </div>
</nav>
</div>
    );
}

export default Dashboard;