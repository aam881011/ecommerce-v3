import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "./../Loading/Loading";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function Product({ Products }) {
  let { addToCart
    ,geCartCount
   } = useContext(CartContext);
  // console.log(Products);
  
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status == "success") {
      geCartCount()
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    console.log(response);
  }

  // async function addProductToWishlist(productId) {
  //   let response = await addToWishlist(productId);
  //   if (response.data.status == "success") {
  //     toast.success(response.data.message);
  //   } else {
  //     toast.error(response.data.message);
  //   }
  //   console.log(response);
  // }


  
  return (
    <div className="products">
      {Products.length > 0 ? (
        Products.map((item) => {
          return (
            <div key={item._id} className=" my-3 product">
              <div className="product  rounded-3 ">
                <Link
                  className=" "
                  to={"/product-details/" + item._id}
                >
                  <img
                    src={item.imageCover}
                    // className="w-100"
                    height={200}
                    alt=""
                  />
                  <div className="py-2 px-1">
                    <h6 className="text-center">{item.category.name}</h6>
                    <p className="fw-bolder">
                      {item.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <div className="d-flex justify-content-between align-items-center  ">
                      <span>
                        {" "}
                        EGP{" "}
                        {item.priceAfterDiscount ? (
                          <>
                            <span className="text-decoration-line-through">
                              {item.price}
                            </span>
                            <span className="ms-3">
                              {item.priceAfterDiscount}
                            </span>
                          </>
                        ) : (
                          <span>{item.price}</span>
                        )}
                      </span>
                      <div>
                        <i className="fas fa-star rating-color"></i>
                        {item.ratingsAverage}
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(item._id)}
                  className="btn bg-main text-white w-100"
                >
                  Add to cart{" "}
                </button>

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
    </div>
  );
}
