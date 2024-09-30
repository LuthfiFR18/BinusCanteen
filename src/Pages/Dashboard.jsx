import React from 'react';
import '../style/Dashboard.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import img1 from '../img/nasigoreng.png';

function Dashboard(){
    const navigate = useNavigate();

    return(
        <div className='dashboard'>
            <div class="navbar1">
                <Header/>
                <nav className='navmenu'>
                    <div class="menu">
                        <ul>
                            <li>
                                <a href="#" onClick={()=>navigate('/meals')}>
                                    <i class="ri-restaurant-line"></i>
                                    Meals
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate('/drink')}>
                                    <i class="ri-drinks-fill"></i>
                        
                                    Drink
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={()=>navigate('/dessert')}>
                                    <i class="ri-cake-3-fill"></i>          
                                    Dessert
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <section className='sectionbestoffer'>

            <h3 className='bestofferforyoufavoriteText'>Best Offer</h3>
            <ul>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/')}>Pesan</button>
                    </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>                </li>   
               
            </ul>
        </section>
        <section className='sectionfavorite'>
            <h3 className='bestofferforyoufavoriteText'>Favorite</h3>
            <ul>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>   
               
            </ul>
        </section>
        <section className='sectionforyou'>
            <h3 className='bestofferforyoufavoriteText'>For You</h3>
            <ul>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>  
                <li>
                    <img src={img1}/>
                    <h6>Nasi Goreng</h6>
                    <h6>Rp17.000</h6>
                    <button className="buttonorder" onClick={()=> navigate('/dashboard')}>Pesan</button>
                </li>   
               
            </ul>
        </section>

            <Footer/>
        </div>
    );
}

export default Dashboard;