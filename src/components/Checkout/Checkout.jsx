import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { onlinePayment, getLoggedUserCart } = useContext(CartContext);
  // const { cartId } = useParams();

  let [cartId, setCartId] = useState(null);

  async function getCartId() {
    let token = localStorage.getItem("userToken");
    if (token) {
      let response = await getLoggedUserCart(token);
      setCartId(response.data.data._id);
      // setTotalPrice(response.data.data.totalCartPrice);
    }
    // console.log(response.data);
  }

  async function handlePayment(values) {
    let { data } = await onlinePayment(cartId, values);
    console.log(data);
    if (data.session) {
      console.log(data.session.url);
      window.location.href = data.session.url;
    }
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handlePayment,
  });

  // const formik = useFormik({
  //   initialValues: {
  //     details: "",
  //     phone: "",
  //     city: "",
  //   },
  //   onSubmit: (vals) => {
  //     console.log(vals);
  //     checkOut(vals, cartId);
  //   },
  // });

  // async function checkOut(vals, id) {
  //   const body = {
  //     shippingAddress: vals,
  //   };
  //   const headers = {
  //     token: localStorage.getItem("userToken"),
  //   };
  //   const { data } = await axios.post(
  //     `${baseUrl}/orders/checkout-session/${id}?url=http://localhost:3000/#/`,
  //     body,
  //     { headers }
  //   );
  //   if (data.status === "success") {
  //     window.location.href = data.session.url;
  //   }
  // }

  useEffect(() => {
    getCartId();
  }, []);

  return (
    <div className="my-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="my-2">
          <label htmlFor="details">Details</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="details"
            id="details"
            className="form-control"
          />
        </div>

        <div className="my-2">
          <label htmlFor="phone">Phone</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="phone"
            id="phone"
            className="form-control"
          />
        </div>

        <div className="my-2">
          <label htmlFor="city">City</label>
          <input
            onChange={formik.handleChange}
            type="text"
            name="city"
            id="city"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Pay
        </button>
      </form>
    </div>
  );
}
