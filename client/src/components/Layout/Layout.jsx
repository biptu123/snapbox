import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { IoLogoWhatsapp } from "react-icons/io";
import styled, { keyframes } from "styled-components";

const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const WhatsappButton = styled.a`
  all: unset;
  position: fixed;
  right: 10px;
  bottom: 10px;
  transition: all 0.5s ease-in-out;
  animation: ${slideInBottom} 0.5s ease-in-out;
  cursor: pointer;
`;

const Layout = (props) => {
  const phoneNumber = "+91 7099481497";
  const message = "Hello Uniquesnapbox! ";
  const generateWhatsappLink = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    } else {
      return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    }
  };
  return (
    <>
      <Header />
      <div style={{ marginTop: "100px" }}>{props.children}</div>
      <WhatsappButton href={generateWhatsappLink()}>
        <IoLogoWhatsapp size={70} color="green" />
      </WhatsappButton>

      <Footer />
    </>
  );
};

export default Layout;
