import React, {useState} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Drink.css';
import Drinkmenu from '../components/Drinkmenu';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from "react-router-dom";

const ButtonStack = () => {
    const [activeButton] = useState(2);
    const navigate = useNavigate();
    const { boothId } = useParams();
    const location = useLocation();
    const boothName = location.state?.boothName || "Unknown Booth";

    // console.log("Booth ID:", boothId);
  
    return (
        <div className="selector-btn">
        <button
        className={`menu-button-meals ${activeButton === 1 ? 'active' : ''}`}
        onClick={() => navigate(`/meals/${boothId}`, { state: { boothName } })}

        >
          Meals
        </button>
        <button
        className={`menu-button-drink drink-btn ${activeButton === 2 ? 'active' : ''}`}
        onClick={() => navigate(`/drinks/${boothId}`, { state: { boothName } })}
          
        >
          Drink
        </button>
        <button
        className={`menu-button-dessert ${activeButton === 3 ? 'active' : ''}`}
        onClick={() => navigate(`/desserts/${boothId}`, { state: { boothName } })}
        
        >
          Dessert
        </button>
      </div>
    );
  };

const Drink = () => {
    const location = useLocation();
    const boothName = location.state?.boothName || "Unknown Booth";

  return (
    <div className="drink-container">
      <div className='drinkpage'>
        <Header/>
        
        <h3 id='booth-name'>{boothName}</h3>

        <ButtonStack/>
        
        <Drinkmenu/>

      </div>
      <Footer/>
    </div>
  )
}

export default Drink;