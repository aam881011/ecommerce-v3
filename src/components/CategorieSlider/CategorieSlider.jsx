import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { baseUrl } from "./../../utils/baseUrl";
import Loading from "../Loading/Loading";

export default function CategorieSlider() {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      let { data } = await axios.get(`${baseUrl}/categories`);
      // console.log(data.data);
      setCategories(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    autoplay: true,
  };

  return (
    <div className="my-5">
      <h3>Show Popular Categories</h3>
      <Slider {...settings} autoplayspeed={3000} className="my-5">
        {categories.length > 0 ? (
          categories.map((item) => {
            return (
              <div key={item._id}>
                <img src={item.image} alt="" className="w-100" height={200} />
                <h6>{item.name}</h6>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </Slider>
    </div>
  );
}
