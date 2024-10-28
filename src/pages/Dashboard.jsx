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

            <Footer/>
            </div>
    );
}

export default Dashboard;