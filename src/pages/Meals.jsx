import React, {useState} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Meals.css';
import Mealsmenu from '../components/Mealsmenu';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from "react-router-dom";

const ButtonStack = () => {
    const [activeButton, setActivateButton] = useState("Meals");

    const handleTabClick = (tabName) => {
      setActivateButton(tabName);
    };
    const navigate = useNavigate();
    const { boothId} = useParams();
    const location = useLocation();
    const boothName = location.state?.boothName || "Unknown Booth";
    // console.log("Booth ID:", boothId);
  
    return (
      <div className="selector-btn">
        <button
        className={`menu-button-meals ${activeButton === "Meals" ? 'active' : ""}`}
        onClick={() =>handleTabClick("Meals")}

        >Meals
        </button>
        <button
        className={`menu-button-drink ${activeButton === "Drink" ? 'active' : ""}`}
        onClick={() => handleTabClick("Drink")}
        >Drink
        </button>
        <button
        className={`menu-button-dessert ${activeButton === "Dessert" ? 'active' : ""}`}
        onClick={() => handleTabClick("Dessert")}
        
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