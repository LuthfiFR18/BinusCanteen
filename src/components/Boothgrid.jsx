import React from 'react'
import '../style/Boothgrid.css'
import img1 from '../img/nasigoreng.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Boothgrid() {
    const navigate = useNavigate();


  return (
    <div className="canteen-list">
                <div className="canteen-container">
                    <div class="box" onClick={()=>navigate('/meals')}>
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
            </div>
  )
}

export default Boothgrid;