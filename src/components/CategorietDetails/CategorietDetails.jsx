import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import Slider from "react-slick";

export default function CategorietDetails() {
  let { id } = useParams();

  const [product, setProduct] = useState([]);
  console.log(product);
  const getProduct = async () => {
    try {
      let { data } = await axios.get(`${baseUrl}/categories/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.log("Error", error);
    }
    // console.log(data.data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   autoplay: true,
  // };

  return (
    <>
      <div className="row  py-3 justify-content-between align-items-center">
        {/* <div className="col-md-2 text-primary">
          <Slider {...settings} className="my-5 ">
            {product?.images &&
              product?.images.map((img, index) => (
                <img
                  key={index}
                  className="w-100"
                  src={img}
                  alt={`Product ${index}`}
                />
              ))}
          </Slider>
        </div> */}

        <div className="col-md-4 d-flex justify-content-between  pt-5 ">
          <img src={product.image} className="w-100" alt="" />
          {/* <div className="col-md-3">
          </div> */}
        </div>
        <div className="col-md-8 mb-5">
          <h3>{product.name}</h3>
          <p>createdAt: {product.createdAt}</p>
          <p>updatedAt: {product.updatedAt}</p>
          {/* <button className="btn btn-success w-100">
              Add Product To Cart
            </button> */}
        </div>
      </div>

      {/* <div className="row  py-3 justify-content-between">
        <div className="col-md-1">
          <Slider {...settings} className="my-5 ">
            <div>
              {product?.images &&
                product?.images.map((img, index) => (
                  <img
                    key={index}
                    className="w-100"
                    src={img}
                    alt={`Product ${index}`}
                  />
                ))}
            </div>
          </Slider>
        </div>

       <div className="col-md-10 d-flex justify-content-between pt-5 ">
         <div className="col-md-3">
           <img src={product.imageCover} className="w-100" alt="" />
         </div>
         <div className="col-md-9">
           <h3>{product.title}</h3>
           <p>{product.description}</p>
           <h5>price: {product.price} EGP</h5>
           <h5>quantity: {product.quantity}</h5>
           <button className="btn btn-success w-100">Add Product To Cart</button>
         </div>
         
       </div>
      </div> */}
    </>
  );
}
