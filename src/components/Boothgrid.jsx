import React, {useEffect, useState} from 'react'
import '../style/Boothgrid.css'
import img1 from '../img/nasigoreng.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Boothgrid() {

    
    const navigate = useNavigate();
    const [booths, setBooths] = useState([]);

    const getBooths = async () => {
        try {
          const response = await axios.get('http://localhost:5000/booth'); // Mengambil daftar booth dari backend
          setBooths(response.data); // Simpan daftar booth ke state booths
        } catch (error) {
          console.error('Error fetching booths:', error);
        }
      };

      useEffect(()=>{
        getBooths();
      }, []);


  return (
    <div className="canteen-list" key={booths.uuid}>
                <div className="canteen-container">
                {booths.map((booth) => (
                    <div className="box" key={booth.uuid} onClick={() => navigate(`/meals/${booth.uuid}`)}>
                      
                        {/* tambah ini untuk menyambungkan page berdasarkan id ${booth.uuid}   */}
                        <div className="box-img">
                            <img src={img1} alt={booth.name} />
                        </div>
                        <h3 className="booth-title">{booth.name}</h3>
                    </div>
                ))}
            
        </div>
    </div>
  )
}

export default Boothgrid;