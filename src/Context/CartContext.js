import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "./../utils/baseUrl";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {
  const [count, setCount] = useState(0);

  // let [cartData, setCartData] = useState();

  let userToken = localStorage.getItem("userToken");
  let headers = { token: userToken };

  function addToCart(productId) {
    return axios
      .post(`${baseUrl}/cart`, { productId: productId }, { headers })
      .then((response) => response)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(
        `${baseUrl}/cart`,{ headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  // async function getLoggedUserCart() {
  //   let { data } = await axios
  //     .get(`${baseUrl}/cart`, { headers })
  //     setCartData(data)
  //     .then((response) => response)
  //     .catch((err) => err);
  // }

  function geCartCount() {
    axios
      .get(`${baseUrl}/cart`, { headers })
      .then((data) => {
        // console.log(data.data.numOfCartItems);
        setCount(data.data.numOfCartItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // async function getLoggedUserCart() {
  //   try {
  //     const { data } = await axios.get(`${baseUrl}/cart`, { headers });
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function updateProductCount(productId, productCount) {
    return axios
      .put(`${baseUrl}/cart/${productId}`, { count: productCount }, { headers })
      // setCount(count)
      .then((response) => response)
      .catch((err) => err);
  }

  function deleteCartItem(token, productId) {
    return axios
      .delete(`${baseUrl}/cart/${productId}`, { headers: { token } })
      .then((response) => response)
      .catch((err) => err);
  }

  // async function deleteCartItem(id) {
  //   let { data } = await axios
  //     .delete(`${baseUrl}/cart/${id}`, { headers })
  //     setCartData(data)
  //     // .then((response) => response)
  //     // .catch((err) => err);
  // }


  // *************************************************************

  // function addToWishlist(productId) {
  //   return axios
  //     .post(`${baseUrl}/wishlist`, { productId: productId }, { headers })
  //     .then((response) => response)
  //     .catch((err) => err);
  // }

  // function getLoggedUserWishlist() {
  //   return axios
  //     .get(`${baseUrl}/wishlist`, { headers })
  //     .then((response) => response)
  //     .catch((err) => err);
  // }

  // const [data, setData] = useState({description:'',image:'', count: 0, data: [] });

  // const getLoggedUserWishlist = async () => {
  //   const response = await fetch( `https://route-ecommerce.onrender.com/api/v1/cart`,{ headers });
  //   const result = await response.json();
  //   setData(result);
  // };




function onlinePayment(cartId,shippingAddress){
  return axios
      .post(`${baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress:shippingAddress}, { headers })
      .then((response) => response)
      .catch((err) => err);
}


  useEffect(() => {
    geCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        deleteCartItem,
        getLoggedUserCart,
        updateProductCount,
        // getLoggedUserWishlist,
        count,
        geCartCount,
        onlinePayment,
        // cartData,
        // setCartData,
        // cartDetails,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
