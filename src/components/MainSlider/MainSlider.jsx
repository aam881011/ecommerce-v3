import React from "react";
import './MainSlider.scss';
import Slider from "react-slick";
import slide1 from "../../images/slider-image-1.jpeg";
import slide2 from "../../images/slider-2.jpeg";
import slide3 from "../../images/slider-image-2.jpeg";
import slide4 from "../../images/slider-image-3.jpeg";


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return (
    <Slider {...settings} className="mainSlid my-3">
      <img src={slide1} alt="" />
      <img src={slide2} alt="" />
      <img src={slide3} alt="" />
      <img src={slide4} alt="" />

    </Slider>
  );
}
