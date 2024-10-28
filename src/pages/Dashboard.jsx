import React, { useEffect } from 'react';
import '../style/Dashboard.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, reset } from '../features/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Boothgrid from '../components/Boothgrid';

function Dashboard(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe()); // Fetch user data when component mounts
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching user:", message);
            navigate("/"); // Redirect if there's an error
        }
    }, [isError, navigate, message]);

    return(
            <div className="dashboard-container">
                <Header/>

                <h4 className='greeting-dashboard'>Welcome, {user?.name || 'Guest'}</h4>

                <Boothgrid/>
                <Boothgrid/>
                <Boothgrid/>
                <Boothgrid/>
            {/* <div className="canteen-list">
                <div className="canteen-container">
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>

                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                    <div class="box">
                        <div class="box-img">
                            <img src={img1}/>
                        </div>
                        <h3 className='booth-title'>Nara Kitchen</h3>
                    </div>
                </div>
            </div> */}
                {/* <nav className='navmenu'>
                    <div class="menu">
                        <ul>
                            <li>
                                <a href="#" onClick={()=>navigate('/meals')}>
                                <FontAwesomeIcon icon={faUtensils} size='4x' />
                                <p className='namenavbar'>Meals</p>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate('/drink')}>
                                <FontAwesomeIcon icon={faGlassWater} size='4x' />
                                <p className='namenavbar'>Drink</p>

                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate('/dessert')}>
                                <FontAwesomeIcon icon={faIceCream} size='4x'/>
                                <p className='namenavbar'>Dessert</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <Carouselbestoffer/>
            <Carouselforyou/>
            <Carouseltodayoffer/>*/}
            <Footer/>
            </div>
    );
}

export default Dashboard;