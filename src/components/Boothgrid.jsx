import React, {useEffect, useState} from 'react'
import '../style/Boothgrid.css'
import img1 from '../img/nasigoreng.png';
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

    const handleBoothClick = (boothId, boothName) => {
      navigate(`/meals/${boothId}`, { state: { boothName } });
    };



  return (
    <div className="canteen-list" key={booths.id}>
                <div className="canteen-container">
                {booths.map((booth) => (
                    <div className="box" key={booth.id} onClick={() => handleBoothClick(booth.id,booth.name)}>
                      
                        {/* tambah ini untuk menyambungkan page berdasarkan id ${booth.uuid}   */}
                        <div className="box-img">
                            <img src={`http://localhost:5000/uploads/${booth.image}`} alt={booth.name} />
                        </div>
                        <h3 className="booth-title">{booth.name}</h3>
                    </div>
                ))}
            
        </div>
    </div>
  )
}

export default Boothgrid;