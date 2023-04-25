import React from "react";
import { Link } from "react-router-dom";
import Loading from "./../Loading/Loading";

export default function Brand({ Brands }) {
  return (
    <>
    <div className="row align-items-center">
      <div className="col-md-3">
        <div className="title">
          <h3>Our Brands</h3>
          <p>Lorem ipsum dolor sit amet consectetur magnam.</p>
        </div>
      </div>
      {Brands.length > 0 ? (
        Brands.map((item) => {
          return (
            <div key={item._id} className="col-md-3 my-3 text-center">
              <div className="product">
                {/* <img src={item.image} alt={item.name} /> */}
                <Link to={"/brand-details/" + item._id}>
                  <img src={item.image} className="w-100" height={250} alt="" />
                  <h1>{item.name}</h1>
                  {/* <h1>{item.slug}</h1> */}
                  {/* <h3>{item.createdAt}</h3> */}
                  {/* <h3>{item.updatedAt}</h3> */}
                  {/* <h3>{item.__v}</h3> */}
                  {/* <h6 className="text-main">{item.category.name}</h6> */}
                  {/* <p className="fw-bolder">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </p> */}
                  {/* <div className="d-flex justify-content-between align-items-center my-4">
                    <span>{item.price} EGP</span> 
                    <div>
                      <i className="fas fa-star rating-color"></i>
                      {item.ratingsAverage}
                    </div>
                  </div> */}
                </Link>

                {/* <button className="btn bg-main text-white w-100">
                  Add to cart{" "}
                </button> */}
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
    </>
  );
}
