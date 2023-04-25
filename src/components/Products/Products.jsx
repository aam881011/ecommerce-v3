import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import Product from "../Product/Product";
import './Products.scss';


export default function Products() {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    let { data } = await axios.get(`${baseUrl}/products`);
    // console.log(data.data);
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="perantProducts">
        <Product Products={products} />
      </div>
    </>
  );
}
