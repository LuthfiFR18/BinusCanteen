import React, {useState} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Dessert.css';
import Dessertmenu from '../components/Dessertmenu';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from "react-router-dom";

const ButtonStack = () => {
    const [activeButton] = useState(3);
    const navigate = useNavigate();
    const { boothId } = useParams();
    const location = useLocation();
    const boothName = location.state?.boothName || "Unknown Booth";

    // console.log("Booth ID:", boothId);
  
    return (
      <div className="selector-btn">
        <button
        className={`menu-button-meals ${activeButton === 1 ? 'active' : 'menu-button'}`}
        onClick={() => navigate(`/meals/${boothId}`, { state: { boothName } })}

        >
          Meals
        </button>
        <button
        className={`menu-button-drink ${activeButton === 2 ? 'active' : 'menu-button'}`}
        onClick={() => navigate(`/drinks/${boothId}`, { state: { boothName } })}
          
        >
          Drink
        </button>
        <button
        className={`menu-button-dessert dessert-btn ${activeButton === 3 ? 'active' : ''}`}
        onClick={() => navigate(`/desserts/${boothId}`, { state: { boothName } })}
        
        >
          Dessert
        </button>
      </div>
    );
  };

const Dessert = () => {
  const location = useLocation();
  const boothName = location.state?.boothName || "Unknown Booth";

  return (
    <div className="dessert-container">
      <div className='dessertpage'>
        <Header/>
        
        <h3 id='booth-name'>{boothName}</h3>

        <ButtonStack />

        <Dessertmenu/>

      </div>
      <Footer/>
    </div>
  )
}

export default Dessert;