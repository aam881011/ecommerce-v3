// import './App.css';
import MainLayout from "./components/Layouts/MainLayout";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import errImg from "./images/error.svg";
import Brands from "./components/Brands/Brands";
import BrandDetails from "./components/BrandDetails/BrandDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from 'react-hot-toast';
import Cart from "./components/Cart/Cart";
import { ToastContainer } from 'react-toastify';
import Wishlist from "./components/Wishlist/Wishlist";
// import Test from "./components/Test";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from './components/ResetPassword/ResetPassword';
import Categories from "./components/Categories/Categories";
import CategorietDetails from "./components/CategorietDetails/CategorietDetails";
import Checkout from "./components/Checkout/Checkout";

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUser();
    }
  }, []);
  const [userData, setUserData] = useState(null);

  function saveUser() {
    let encodedToken = localStorage.getItem("userToken");
    let decoded = jwtDecode(encodedToken);
    setUserData(decoded);
  }

  let routes = createHashRouter([
    {
      path: "/",
      element: <MainLayout userData={userData} setUserData={setUserData} />,
      children: [
        { index: true, element: <HomePage /> },
        // { path: "products", element: <Products /> },
        { path: "product-details/:id", element: <ProductDetails /> },
        { path: "categorie-details/:id", element: <CategorietDetails /> },
        { path: "brand-details/:id", element: <BrandDetails /> },
        { path: "register", element: <Register /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
        // { path: "test", element: <Test /> },
        { path: "login", element: <Login saveUser={saveUser} /> },
        {
          path: "*",
          element: (
            <div className="text-center py-3">
              <img src={errImg} alt="" />
            </div>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },

        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          ),
        },

        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },

        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },

        {
          // path: "checkout/:cartId",
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },


        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },

        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <CartContextProvider>
      <Toaster />
      <ToastContainer theme="colored" />
        <RouterProvider router={routes} />
      </CartContextProvider>
    </div>
  );
}

export default App;
