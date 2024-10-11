import React, { useState } from "react";
import Slider from "react-slick";
import img1 from '../img/nasigoreng.png';
import '../style/Carouselbestoffer.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FoodAndDrinkCard = ({ id, name, price, imgSrc, activeCard, setActiveCard, quantities, setQuantities }) => {

  const handlePesanClick = (id) => {
    setActiveCard(id); // Set the current card as active
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] || 1, // Set default quantity to 1 if not set
    }));
  };

  const handleQuantityChange = (id, amount) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, (prevQuantities[id] || 1) + amount); // Allow quantity to be 0

      if (newQuantity <= 0) {
        // If quantity reaches 0, reset the active card and set the quantity to 0
        setActiveCard(null); // Reset active card
        return {
          ...prevQuantities,
          [id]: 0, // Set quantity to 0
        };
      }

      return {
        ...prevQuantities,
        [id]: newQuantity,
      };
    });
  };

  const handleConfirm = () => {
    setActiveCard(null); // Hide the selector after confirming
    // Further actions like sending the order data can go here
  };

  return (
    <div className="food-drink-card">
      <div className="image-container">
        <img 
          src={imgSrc} 
          className={`food-drink-image ${activeCard === id ? 'blur' : ''}`} 
        />
        {activeCard === id && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(id, -1)}>-</button>
            <span className="quantity-number">{quantities[id]}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(id, 1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
      <h6 className="name-product">{name}</h6>
      <br />
      <h6 className="price">Rp: {price}</h6>
      </div>
      {activeCard === id ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={() => handlePesanClick(id)}>Pesan</button>
      )}
    </div>
  );
}

function Carouselbestoffer (){

  const [activeCard, setActiveCard] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store quantity for each card

  const foods = [
    { id: 1, name: 'Nasi Goreng', price: '17.000', imgSrc: img1 },
    { id: 2, name: 'Nasi Goreng', price: '17.000', imgSrc: img1 },
    { id: 3, name: 'Nasi Goreng', price: '17.000', imgSrc: img1 },
    { id: 4, name: 'Nasi Goreng', price: '17.000', imgSrc: img1 },
    { id: 5, name: 'Nasi Goreng', price: '17.000', imgSrc: img1 },
    { id: 6, name: 'Nasi Goreng', price: '17.000', imgSrc: img1 },
  ];

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false,
        // nextArrow: false,
        // prevArrow: false,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          // {
          //   breakpoint: 480,
          //   settings: {
          //     slidesToShow: 1,
          //     slidesToScroll: 1
          //   }
          // }
        ]
      };

  return (
    <div className="slider-bestoffer-container">
        <h4 className="bestofferText">Best Offer</h4>
    <Slider {...settings}>

    {foods.map(food => (
        <FoodAndDrinkCard 
          key={food.id} 
          id={food.id} 
          name={food.name} 
          price={food.price} 
          imgSrc={food.imgSrc} 
          activeCard={activeCard} 
          setActiveCard={setActiveCard} 
          quantities={quantities}
          setQuantities={setQuantities}
        />
      ))}
    </Slider>
    </div>
  );
}
export default Carouselbestoffer