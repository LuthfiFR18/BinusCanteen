import React, {useState} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Meals.css';
import Mealsmenu from '../components/Mealsmenu';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from "react-router-dom";

const ButtonStack = () => {
    const [activeButton] = useState(1);
    const navigate = useNavigate();
    const { boothId} = useParams();
    const location = useLocation();
    const boothName = location.state?.boothName || "Unknown Booth";
    // console.log("Booth ID:", boothId);
  
    return (
      <div className="selector-btn">
        <button
        className={`menu-button-meals meals-btn ${activeButton === 1 ? 'active' : 'menu-button-meals'}`}
        onClick={() => navigate(`/meals/${boothId}`, { state: { boothName } })}

        >Meals
        </button>
        <button
        className={`menu-button-drink ${activeButton === 2 ? 'active' : 'menu-button-drink'}`}
        onClick={() => navigate(`/drinks/${boothId}`, { state: { boothName } })}
          
        >Drink
        </button>
        <button
        className={`menu-button-dessert ${activeButton === 3 ? 'active' : 'menu-button-dessert'}`}
        onClick={() => navigate(`/desserts/${boothId}`, { state: { boothName } })}
        
        >Dessert
        </button>
      </div>
    );
  };

  const Meals = () => {
    const location = useLocation();
    const boothName = location.state?.boothName || "Unknown Booth";

    
  return (
    <div className="meals-container">
      <div className='Mealspage'>
        <Header/>
    
        <h3 id='booth-name'>{boothName}</h3>

        <ButtonStack />
                    
        <Mealsmenu/>
        
    </div>
    <Footer/>

    </div>
  )
}

export default Meals;