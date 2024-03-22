import React from "react";
import cornerImg from "../../assets/images/corner-img.png";
import { useNavigate } from "react-router-dom";
import Partner from "../../components/Partner/Partner";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="header-bg-parent">
        <div className="header-col1">
          <h5>WELCOME TO UNIQUE SNAPBOX</h5>
          <h2>DIGITAL SERVICES</h2>
          <h2
            className="typewrite"
            data-period={1000}
            data-type='[ "for Business", "to sell online", "for your ideas","GST Registration"]'
          />
          <p> BUISNESS CONSULTANCY SERVICES &amp; SOLOUTION</p>
        </div>
        <div className="header-col2"></div>
        <div className="clear" />
        <img className="hedaer-bg-par-img" src={cornerImg} alt="corner" />
      </section>
      <Partner />
    </>
  );
};

export default Hero;
