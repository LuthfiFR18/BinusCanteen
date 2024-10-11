import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../img/nasigoreng.png'
import '../style/Carouselbestoffer.css'; // Import CSS for styling

const FoodCard = ({ id, name, price, imgSrc, activeCard, setActiveCard, quantities, setQuantities }) => {
  const handlePesanClick = (id) => {
    setActiveCard(id); // Set the current card as active
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] || 1, // Set default quantity to 1 if not set
    }));
  };

  const handleQuantityChange = (id, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + amount), // Ensure quantity doesn't go below 1
    }));
  };

  const handleConfirm = () => {
    setActiveCard(null); // Hide the selector after confirming
    // Further actions like sending the order data can go here
  };

  return (
    <div className="food-card">
      <div className="image-container">
        <img 
          src={{img1}} 
          className={`food-image ${activeCard === id ? 'blur' : ''}`} 
        />
        {activeCard === id && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(id, -1)}>-</button>
            <span className="quantity-number">{quantities[id]}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(id, 1)}>+</button>
          </div>
        )}
      </div>
      <h2>{name}</h2>
      <p className="price">Rp: {price}</p>
      {activeCard === id ? (
        <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="order-button" onClick={() => handlePesanClick(id)}>Pesan</button>
      )}
    </div>
  );
}

const FoodCarousel = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store quantity for each card

  const foods = [
    { id: 1, name: 'Nasi Goreng', price: '17.000', imgSrc: {img1}},
    { id: 2, name: 'Nasi Goreng', price: '17.000', imgSrc: {img1}},
    { id: 3, name: 'Nasi Goreng', price: '17.000', imgSrc: {img1}},
    { id: 4, name: 'Nasi Goreng', price: '17.000', imgSrc: {img1}},
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {foods.map(food => (
        <FoodCard 
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
  );
}

export default FoodCarousel;
