import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="footer bg-main-light p-4 ">
        <h2>Fresh Cart Footer</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
        <div className="container mb-3 d-flex justify-content-between">
          <input
            type="text"
            className="form-control w-75"
            placeholder="Email.."
          />
          <button className="btn bg-main text-white ms-3 w-25">Share App Link</button>
        </div>
        <div className="container d-flex justify-content-between align-items-center border-top border-bottom border-2 border-dark py-4">
          <div className="leftPart">
            <ul className="list-unstyled d-flex">
              <li className="me-2">
                <h6>Payment Parteners</h6>
              </li>
              <li className="me-2 text-primary">
                <i className="fa-brands fa-paypal"></i>
              </li>
              <li className="me-2 text-primary">
                <i className="fa-brands fa-cc-amazon-pay"></i>
              </li>
              <li className="me-2 text-primary">
                <i className="fa-brands fa-cc-mastercard"></i>
              </li>
            </ul>
          </div>
      
          <div className="rightPart d-flex align-items-center">
            <h6>Get Deliveries with FreshCart</h6>
            <button className="btn btn-dark btn-lg mx-3">
              <i className="fa-brands fa-app-store me-2"></i>
              <span>Available on App Store</span>
            </button>
            <button className="btn btn-dark btn-lg">
              <i className="fa-brands fa-google-play me-2"></i>
              <span>Get it from Google play</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
