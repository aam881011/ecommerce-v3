import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { notify } from "./../../utils/notify";
import Loading from "../Loading/Loading";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateProductCount,
    // cartDetails,
    // setCartDetails,
    deleteCartItem,
    geCartCount,
    // cartData,
    // setCartData,
  } = useContext(CartContext);

  let [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState([]);
  // console.log(cart.data);

  async function getCart() {
    let token = localStorage.getItem("userToken");
    if (token) {
      let response = await getLoggedUserCart(token);
      setCart(response.data.data.products);
      setTotalPrice(response.data.data.totalCartPrice);
    }
    // console.log(response.data);
  }

  async function deleteItem(productId) {
    let token = localStorage.getItem("userToken");

    if (token) {
      let response = await deleteCartItem(token, productId);
      setCart(response.data.data.products);
      setTotalPrice(response.data.data.totalCartPrice);
      notify("product deleted", "success");
      geCartCount();
    }
    // console.log(response.data);
  }

  // async function deleteItem(productId) {
  //   let response = await deleteCartItem(productId);
  //   setCart(response.data);
  //   // console.log(response.data);
  //   if (response.data.status == "success") {
  //     geCartCount()
  //     toast.success(response.data.message);
  //   } else {
  //     toast.error(response.data.message);
  //   }
  // }

  async function updateCount(productId, count) {
    let response = await updateProductCount(productId, count);
    setCart(response.data.data.products);
    setTotalPrice(response.data.data.totalCartPrice);
    if (response.data.status == "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  // async function updateCount(productId, count) {
  //   let token = localStorage.getItem("userToken");

  //   let response = await updateProductCount(token, productId, count);
  //   if (token) {
  //     setCart(response.data.data.products);
  //     setTotalPrice(response.data.data.totalCartPrice);
  //     notify("product updated", "success");
  //   }
  //   //  else {
  //   //       toast.error(response.data.data.message);
  //   //     }
  //   // console.log(response.data);
  // }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Shop Cart </title>
      </Helmet>



      {/* {cartData !== null ? ( */}
        
        {/* {cartData.length != 0 ?
        <div className="bg-main-light p-4 my-4">
          <h5>Shop Cart </h5>
          <h6 className="text-main">
            Total Price : {cartData.data.totalCartPrice} EGP
          </h6>
          {cartData.data.products.map((product, index) => (
            <div
              key={index}
              className="row border-bottom py-2 my-2 align-items-center"
            >
              <div className=" col-xs-1 col-md-1 col-sm-2 img-cart">
                <img
                  src={product.product.imageCover}
                  alt="product"
                  className="w-100"
                />
              </div>
              <div className="col-md-11 col-sm-10 d-flex justify-content-between">
                <div>
                  <h6 className="fw-bolder">{product.product.title}</h6>
                  <h6 className="text-main">{product.price} EGP</h6>
                  <button
                    onClick={() => deleteItem(product.product._id)}
                    className="btn m-0 p-0"
                  >
                    {" "}
                    <i className="text-danger btn-sm font-sm fa-regular fa-trash-can"></i>{" "}
                    remove{" "}
                  </button>
                </div>
                <div className="btn-cart col-5 col-sm-2">
                  <button
                    onClick={() =>
                      updateCount(product.product._id, product.count + 1)
                    }
                    className="btn  btn-sm border-main"
                  >
                    +
                  </button>
                  <span className="d-inline-block mx-2">{product.count}</span>
                  <button
                    onClick={() =>
                      updateCount(product.product._id, product.count - 1)
                    }
                    className="btn  btn-sm border-main"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Link
            to={"/checkout/"+cartData.data._id}
            className="btn btn-success mt-3"
          >
            Checkout
          </Link>
        </div> : <Loading />} */}


        
      {/* ) : null} */}








      {/* {cart !== null ? ( */}
      <>
        {cart.length != 0 ? (
          <>
            <div className="bg-main-light p-4 my-4">
              <h3>Shop Cart</h3>
              <h6 className="text-main my-3 fw-bold">
                Total Price : {totalPrice} EGP
              </h6>
              {cart.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="row border-bottom py-2 my-2 align-items-center"
                  >
                    <div className=" col-xs-1 col-md-1 col-sm-2 img-cart">
                      <img
                        src={item.product.imageCover}
                        alt="product"
                        className="w-100"
                      />
                    </div>
                    <div className="col-md-11 col-sm-10 d-flex justify-content-between">
                      <div>
                        <h6 className="fw-bolder">{item.product.title}</h6>
                        <h6 className="text-main">{item.price} EGP</h6>
        
                        <button
                          onClick={() => deleteItem(item.product._id)}
                          className="btn m-0 p-0"
                        >
                          {" "}
                          <i className="text-danger btn-sm font-sm fa-regular fa-trash-can"></i>{" "}
                          remove{" "}
                        </button>
                      </div>
                      <div className="btn-cart col-5 col-sm-2">
                        <button
                          onClick={() =>
                            updateCount(item.product._id, item.count + 1)
                          }
                          className="btn  btn-sm border-main"
                        >
                          +
                        </button>
                        <span className="d-inline-block mx-2">{item.count}</span>
                        <button
                          onClick={() =>
                            updateCount(item.product._id, item.count - 1)
                          }
                          className="btn  btn-sm border-main"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              // to={"/checkout/" + cart._id}
              to={"/checkout"}
              // to="/checkout/"
              className="btn btn-success my-3"
            >
              Checkout
            </Link>
          </>
        ) : (
          <Loading />
        )}
      </>
       {/* ) : null} */}
    </>
  );
}
