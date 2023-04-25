import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const notify = (msg, type) => {
    toast[type](msg);
  };
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errMassage, setErrMassage] = useState(null);

  async function handleLogin(values) {
    console.log("1111", values);
    setisLoading(true);
    setErrMassage(null);
    let { data } = await axios
      .put(
        "https://route-ecommerce.onrender.com/api/v1/auth/resetPassword",
        values
      )
      .catch((err) => {
        console.log(err);
        setisLoading(false);
        notify(err.response.data.message, "error");
        setErrMassage(err.response.data.message);
      });
    console.log(data);
    if (data.token) {
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      // saveUser();
      notify("success", "success");
      navigate("/login");
    }
  }

  let mySchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => handleLogin(values),
  });

  return (
    <div className="login">
      <div className="w-75 mx-auto py-4">
        <h3>Reset Password : </h3>
        {errMassage ? (
          <div className="alert alert-danger">{errMassage}</div>
        ) : (
          ""
        )}

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

          <div className="form-group">
            <label htmlFor="newPassword">Password</label>
            <input
              type="password"
              className="form-control mb-2"
              id="newPassword"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.newPassword ? (
              <div className="alert alert-danger">
                {formik.errors.newPassword}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <Link to={'/forgotPassword'} className='text-main'>Forgot Your Password ...?</Link>
          <br /> */}
          <button type="submit" className="btn bg-main btn-white mt-4">
            {isLoading == true ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
