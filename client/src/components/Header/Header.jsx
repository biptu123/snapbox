import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="home" className="fixed">
      <div className="container">
        <div className="top-bar">
          <div className="nav-col">
            <div className="logo">
              <img src={logo} className="img-responsive" alt="logo" />
            </div>
            {/*logo*/}
            <div className="menu">
              <Link className="active" to="/">
                Home
              </Link>
              <Link to="/about">About US</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/user">My Account</Link>
            </div>
            <div className="clear" />
            {/*clear*/}
          </div>
          {/*nav-col*/}
          <div className="cnt-info-col">
            <a href="tel:+91 02269620313">
              <span>Call US:</span>+91 02269620313
            </a>
          </div>
          <div className="clear" />
          {/*clear*/}
        </div>
        {/*top-bar*/}
      </div>
    </header>
  );
};

export default Header;
