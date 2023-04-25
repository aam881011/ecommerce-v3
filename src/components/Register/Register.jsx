import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
// import { object, string, number, date, InferType } from "yup";

export default function Register() {
  const notify = (msg,type) =>{
    toast[type](msg);
  };

  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [errMassage, setErrMassage] = useState(null);

  // async function handleRegister(values) {
  //   let { data } = await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup", {
  //     username: formik.values.username,
  //     password: formik.values.password,
  //     email: formik.values.email,
  //   });
  // }

  // function validate(values) {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name minlength is 3";
  //   } else if (values.name.length > 10) {
  //     errors.name = "Name maxlength is 10";
  //   }

  //   if (!values.email) {
  //     errors.email = "email is required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "email is invalid";
  //   }

  //   if (!values.password) {
  //     errors.password = "password is required";
  //   } else if (!/^[A-Z] [a-z0-9] {5,10}$/i.test(values.password)) {
  //     errors.password = "Password must start with uppercase  ";
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "rePassword is required";
  //   } else if (values.password !== values.rePassword) {
  //     errors.rePassword = "Password and rePassword doesnt match  ";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is required";
  //   } else if (!/^01[0125] [0-9] {8}$/i.test(values.phone)) {
  //     errors.phone = "invalid phone  ";
  //   }

  //   // if (!formik.values.password) {
  //   //   errors.password = "Password is required";
  //   // }
  //   // if (!formik.values.email) {
  //   //   errors.email = "Email is required";
  //   // }

  //   return errors;
  // }

  async function handleRegister(values) {
    console.log("1111", values);
    setisLoading(true);
    setErrMassage(null);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signup", values)
      .catch((err) => {
        console.log(err)
        setisLoading(false);
        notify(err.response.data.message,'error');
        setErrMassage(err.response.data.message);
      });
    // console.log(data);
    if (data.message == "success") {
      setisLoading(false);
      notify("success",'success');
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name minlength is 3")
      .max(15, "Name maxlength is 15!")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword must be match")
      .required("Name is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("Name is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => handleRegister(values),
  });

  return (
    <>
      <div className="w-75 mx-auto py-4">
        <h3>Register Now : </h3>
        {errMassage ? (
          <div className="alert alert-danger">{errMassage}</div>
        ) : (
          ""
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="name"
            />

            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger">{formik.errors.name} </div>
            ) : (
              ""
            )}
          </div>
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
              placeholder="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email} </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control mb-2"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="password"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">
                {formik.errors.password}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="rePassword">rePassword</label>
            <input
              type="password"
              className="form-control mb-2"
              id="rePassword"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="rePassword"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger">
                {formik.errors.rePassword}{" "}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              placeholder="phone"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone} </div>
            ) : (
              ""
            )}
          </div>
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main btn-white mt-4"
          >
            {isLoading == true ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
