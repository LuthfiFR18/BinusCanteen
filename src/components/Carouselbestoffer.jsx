import React, { useState } from "react";
import Slider from "react-slick";
import img1 from '../img/nasigoreng.png';
import '../style/Carouselbestoffer.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Carouselbestoffer (){

  
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handlePesanClick = () => {
    setShowQuantity(true);
  };

  const handleQuantityChange = (amount) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      if(newQuantity<1){
        setShowQuantity(false);
      }
      return Math.max(1, newQuantity); // Prevent going below 1
    });
  };

  const handleConfirm = () => {
    setShowQuantity(false);
  };

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
              slidesToShow: 2,
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
      <div className="carousel-bestoffer">

      <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity  ? 'blur' : ''}`} 
        />
        {showQuantity &&  (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange( -1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange( 1)}>+</button>
          </div>
        )}
        </div>

        <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/>Rp.17.000</h6>
        </div>

        {showQuantity ?(
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={() => handlePesanClick()}>Pesan</button>
      )}
      </div>
      <div className="carousel-bestoffer">
      <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity ? 'blur' : ''}`}/>
          

        {showQuantity && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        </div>
      {showQuantity ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={handlePesanClick}>Pesan</button>
      )}
      </div>
      <div className="carousel-bestoffer">
      <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity ? 'blur' : ''}`}/>
          

        {showQuantity && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        </div>
      {showQuantity ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={handlePesanClick}>Pesan</button>
      )}
      </div>
      <div className="carousel-bestoffer">
      <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity ? 'blur' : ''}`}/>
          

        {showQuantity && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        </div>
      {showQuantity ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={handlePesanClick}>Pesan</button>
      )}
      </div>
      <div className="carousel-bestoffer">
      <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity ? 'blur' : ''}`}/>
          

        {showQuantity && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        </div>
      {showQuantity ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={handlePesanClick}>Pesan</button>
      )}
      </div>
      <div className="carousel-bestoffer">
      <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity ? 'blur' : ''}`}/>
          

        {showQuantity && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        </div>
      {showQuantity ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={handlePesanClick}>Pesan</button>
      )}
      </div>
      <div className="carousel-bestoffer">
      <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity ? 'blur' : ''}`}/>
          

        {showQuantity && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        </div>
      {showQuantity ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={handlePesanClick}>Pesan</button>
      )}
      </div>
      <div className="carousel-bestoffer">
       <div className="image-container">
        <img 
          src={img1} 
          className={`food-image ${showQuantity ? 'blur' : ''}`}/>
          

        {showQuantity && (
          <div className="quantity-selector">
            <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
            <span className="quantity-number">{quantity}</span>
            <button className="quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        )}
      </div>
      <div className="carousel-bestoffer-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        </div>
      {showQuantity ? (
        <button className="button-bestoffer" onClick={handleConfirm}>Confirm</button>
      ) : (
        <button className="button-bestoffer" onClick={handlePesanClick}>Pesan</button>
      )}
      </div>
    </Slider>
  </div>     
  );
}
export default Carouselbestoffer