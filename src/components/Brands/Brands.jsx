import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import Brand from "../Brand/Brand";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const getAllBrands = async () => {
    try {
      let { data } = await axios.get(`${baseUrl}/brands`);
      // console.log(data.data);
      setBrands(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <div className="row">
        <Brand Brands={brands} />
      </div>
    </>
  );
}
