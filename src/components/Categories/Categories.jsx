import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import Categorie from "../Categorie/Categorie";
// import Product from "../Product/Product";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    let { data } = await axios.get(`${baseUrl}/categories`);
    // console.log(data.data);
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="row">
        <Categorie Products={products} />
      </div>
    </>
  );
}
