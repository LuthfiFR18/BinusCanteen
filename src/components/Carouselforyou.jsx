import React from "react";
import Slider from "react-slick";
import img1 from '../img/nasigoreng.png';

import '../style/Carouselforyou.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// function Arrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "white" }}
//       onClick={onClick}
//     />
//   );
// }

function Carouselforyou() {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        arrows: false,
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
    <div className="slider-foryou-container">
        <h4 className="forYouText">For You</h4>
    <Slider {...settings}>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6 >Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
      <div className="carousel-foryou">
        <img src={img1}/>
        <div className="carousel-foryou-text">
        <h6>Nasi Goreng
        <br/><br/> Rp.17.000</h6>
        <button className="button-foryou">Pesan</button>
        </div>
      </div>
    </Slider>
  </div>     
  );
}
export default Carouselforyou;