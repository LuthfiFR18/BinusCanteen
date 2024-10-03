import React from "react";
import Slider from "react-slick";
import img1 from '../img/nasigoreng.png';

import '../style/Carouseltodayoffer.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    />
  );
}

function Carouseltodayoffer() {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        nextArrow: <Arrow />,
        prevArrow: <Arrow />,
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
    <div className="slider-container">
        <h4>Today Offer</h4>
    <Slider {...settings}>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
      <div className="carousel-todayoffer">
        <img src={img1}/>
        <div className="carousel-todayoffer-text">
        <h6>Nasi Goreng</h6>
        <h6>Rp17.000</h6>
        <button>Pesan</button>
        </div>
      </div>
    </Slider>
  </div>     
  );
}
export default Carouseltodayoffer;