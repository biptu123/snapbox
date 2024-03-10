import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const Menu = styled.div`
  display: none;
  @media (min-width: 1090px) {
    display: block;
  }
`;

const StartButton = styled.div`
  display: none;
  @media (min-width: 1090px) {
    display: block;
  }
`;
const Hamburger = styled.div`
  position: fixed;
  right: 10px;
  z-index: 1000;
  top: 10px;
  display: none;
  @media (max-width: 1090px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #4e4848;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MobileMenuItem = styled(NavLink)`
  color: white;
  font-size: 24px;
  margin: 10px 0;
  text-decoration: none;
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const handleMenuItemClick = () => {
    setIsOpen(false); // Close the menu after clicking a menu item
  };

  return (
    <div style={{ position: "relative" }}>
      <header id="home" className="fixed-header">
        <div className="container">
          <div className="top-bar d-flex justify-content-between align-items-center">
            <div className="nav-col">
              <div className="logo">
                <img src={logo} className="img-responsive" alt="logo" />
              </div>

              <Menu className="menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About US</NavLink>
                <NavLink to="/services">Services</NavLink>
                <NavLink to="/contact">Contact Us</NavLink>
                <NavLink to="/user">My Account</NavLink>
              </Menu>
            </div>
            <StartButton className="">
              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={() => navigate("/signin")}
              >
                Get Started
              </button>
            </StartButton>
          </div>
        </div>
      </header>
      <Hamburger>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={toggle}
        >
          {!isOpen ? (
            <FaBarsStaggered size={40} color="black" />
          ) : (
            <MdCancel size={40} color="black" />
          )}
        </button>
      </Hamburger>
      {isOpen && (
        <MobileMenu>
          <MobileMenuItem to="/" onClick={handleMenuItemClick}>
            Home
          </MobileMenuItem>
          <MobileMenuItem to="/about" onClick={handleMenuItemClick}>
            About Us
          </MobileMenuItem>
          <MobileMenuItem to="/services" onClick={handleMenuItemClick}>
            Services
          </MobileMenuItem>
          <MobileMenuItem to="/contact" onClick={handleMenuItemClick}>
            Contact Us
          </MobileMenuItem>
          <MobileMenuItem to="/user" onClick={handleMenuItemClick}>
            My Account
          </MobileMenuItem>
          <MobileMenuItem to="/signin" onClick={handleMenuItemClick}>
            Get Started
          </MobileMenuItem>
        </MobileMenu>
      )}
    </div>
  );
};

export default Header;
