import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function BrandDetails() {
  let { id } = useParams();

  const [brand, setBrand] = useState([]);
  const getBrand = async () => {
    try {
      let { data } = await axios.get(`${baseUrl}/brands/${id}`);
      // console.log(data.data);
      setBrand(data.data);
    } catch (error) {
      console.log("Error",error);
    }
  };
  useEffect(() => {
    getBrand();
  }, []);

  return (
    <>
      {brand ? (
        <div className="row">
          <div className="col-md-3">
            <img src={brand.image} className="w-100" alt="" />
          </div>
          <div className="col-md-9">
            <h3>{brand.name}</h3>
            <h3>{brand.slug}</h3>
            <h3>{brand.createdAt}</h3>
            <h3>{brand.updatedAt}</h3>
            <h3>{brand.__v}</h3>
            {/* <p>{brand.description}</p> */}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
