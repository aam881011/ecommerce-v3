import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Badge, Button } from "react-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/freshcart-logo.svg";

import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const Navigation = ({ userData, logOut }) => {
  
  let { count } = useContext(CartContext);

  // async function getCarty() {
  //   let response = await getLoggedUserCart();
  //   setCartDetails(response.data);
  // }

  // useEffect(() => {
  //   getCarty();
  // }, [cartDetails]);

  return (
    <Navbar className="bg-main-light" variant="" expand="lg">
      <Container>
        <Navbar.Brand to="/home">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {userData && (
            <Nav className="me-auto ">
              <NavLink to="/">Home</NavLink>

              <NavLink to="/cart">Cart</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/categories">Categories</NavLink>
              <NavLink to="/brands">Brands</NavLink>
              {/* <NavLink to="/login">login</NavLink>
            <NavLink to="/">register</NavLink> */}
            </Nav>
          )}

          <Nav className="ms-auto mt-2">
            {userData ? (
              <>
                <div className="social-media pt-2 pe-3">
                  <i className="fab mx-1 fa-facebook"></i>
                  <i className="fab mx-1 fa-instagram"></i>
                  <i className="fab mx-1 fa-twitter"></i>
                  <i className="fab mx-1 fa-spotify"></i>
                  <i className="fab mx-1 fa-youtube"></i>
                </div>
                <NavLink
                  to="/wishlist"
                  type="button"
                  className=" me-3 border-0 position-relative link-nav"
                >
                  Wishlist <i className="fa-regular fa-heart"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    5<span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>

                <NavLink
                  to="/cart"
                  type="button"
                  className="btn me-3 border-0 position-relative link-nav2"
                >
                  Cart <i className="fa-solid fa-cart-shopping"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {/* {cartDetails !== null ? (
                      <>{cartDetails.numOfCartItems}</>
                    ) : null} */}
                    
                    {count}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>

                <span className="cursor-pointer pt-2 ps-2" onClick={logOut}>
                  LogOut
                </span>
              </>
            ) : (
              <>
                <NavLink to="login">Login</NavLink>
                <NavLink to="/register">register</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
