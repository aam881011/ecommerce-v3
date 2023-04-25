import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";
import Navigation from "../Navigation/Navigation";
// import Navigation from "../Navigation/Navigation";
import { Container } from "react-bootstrap";
// import Slider from "../Slider/Slider";
import { useNavigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";

export default function MainLayout({ userData, setUserData }) {
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    // let decoded = jwtDecode(encodedToken);
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <Navigation userData={userData} logOut={logOut} />
      {/* <Slider /> */}
      <Container>
        <Outlet></Outlet>
      </Container>
      {/* <Online>
        {" "}
        <div className="network">Only shown when you're online</div>{" "}
      </Online> */}
      <Offline>
        <div className="network">Only shown offline (surprise!) <i className="fas fa-wifi"></i> </div>
      </Offline>
      <Footer />
    </>
  );
}
