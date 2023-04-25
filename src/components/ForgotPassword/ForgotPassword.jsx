import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { baseUrl } from "./../../utils/baseUrl";

export default function ForgotPassword() {
  let Navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [flageData, setflageData] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  let mySchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  async function forgotPassword(val) {
    let { data } = await axios.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,
      val
    );
    console.log(data);
    if (data.statusMsg === "success") {
      setflageData(true);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      // console.log(values);
      forgotPassword(values);
    },
  });

  async function resetPassword(val) {
    let { data } = await axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,
        val
      )
      .catch((err) => {
        // console.log(err);
        seterrMsg(err.response.data.message);
      });
    if (data.status === "Success") {
      Navigate("/resetPassword");
    }
    console.log(data);
  }

  let formik1 = useFormik({
    initialValues: {
      resetCode: "",
    },
    // validationSchema: mySchema,
    onSubmit: (values) => {
      // console.log(values);
      resetPassword(values);
    },
  });

  return (
    <div className="login">
      <h3>Forgot Your Password : </h3>
      <div className="w-75 mx-auto py-4">
        {flageData ? (
          <form onSubmit={formik1.handleSubmit}>
            <div className="form-group">
              <label htmlFor="resetCode">resetCode</label>
              <input
                type="text"
                className="form-control mb-2"
                id="resetCode"
                name="resetCode"
                value={formik1.values.resetCode}
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
              />
              {formik1.errors.resetCode && formik1.touched.resetCode ? (
                <div className="alert alert-danger">
                  {formik1.errors.resetCode}{" "}
                </div>
              ) : (
                ""
              )}
              {errMsg !== "" ? (
                <div className="alert alert-danger">{errMsg}</div>
              ) : null}
            </div>

            {/* <Link to={'/forgotPassword'} className='text-main'>Forgot Your Password ...?</Link> */}
            <br />
            <button type="submit" className="btn bg-main btn-white mt-4">
              {isLoading == true ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control mb-2"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger">{formik.errors.email} </div>
              ) : (
                ""
              )}
            </div>

            {/* <Link to={'/forgotPassword'} className='text-main'>Forgot Your Password ...?</Link> */}
            <br />
            <button type="submit" className="btn bg-main btn-white mt-4">
              {isLoading == true ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Send"
              )}
            </button>
          </form>
        )}
        {/* {errMassage? <div className="alert alert-danger">{errMassage}</div> : '' } */}
      </div>
    </div>
  );
}
