import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-col">
          <h3>About Us</h3>
          <p>
            We focus on the needs of small to middle market businesses to
            improve and grow their return.so that your site will withstand the
            test of time. We care about your business, which is why we work with
            you.
          </p>
        </div>
        {/*footer-col*/}
        <div className="footer-col footer-2-col">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            {/* <li>Portfolio</li>
            <li>Our Blog</li> */}
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
          </ul>
        </div>
        {/*footer-col*/}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>
            <a href="mailto:admin@uniquesnapbox.in">admin@uniquesnapbox.in</a>
          </p>
          <p>
            <a href="tel:+91 02269620313">+91 02269620313</a>
          </p>
          <p>
            <span>DAKBANGLOW ROAD, KARIMGANJ, ASSAM, 788710</span>
          </p>
        </div>
        {/*footer-col*/}
        <div className="clear" />
        <hr className="footer-hr" />
        <p className="copyright-footer">
          © 2024 — UNIQUE SNAPBOX. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
