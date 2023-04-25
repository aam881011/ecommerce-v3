import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";

export default function Categorie({ Products }) {
  let { addToCart,addToWishlist } = useContext(CartContext);
  // console.log(Products);
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(response);
  }

  async function addProductToWishlist(productId) {
    let response = await addToWishlist(productId);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(response);
  }


  
  return (
    <>
      {Products.length > 0 ? (
        Products.map((item) => {
          return (
            <div key={item._id} className="col-md-2 my-3">
              <div className="product  rounded-3 ">
                <Link
                  className=" "
                  to={"/categorie-details/" + item._id}
                >
                  <img
                    src={item.image}
                    className="w-100"
                    height={200}
                    alt=""
                  />
                  <div className="py-2 px-1">
                    <h6 className="text-center">{item.name}</h6>
                  </div>
                </Link>
                {/* <button
                  onClick={() => addProductToCart(item._id)}
                  className="btn bg-main text-white w-100"
                >
                  Add to cart{" "}
                </button> */}

                {/* <button
                  onClick={() => addProductToWishlist(item._id)}
                  className="btn bg-main text-white w-100 mt-1"
                >
                  Add to Wishlist{" "}
                </button>
                 */}
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
}
